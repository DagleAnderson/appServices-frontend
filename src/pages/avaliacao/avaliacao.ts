import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { PrestadorDTO } from '../../models/prestador.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PrestadorService } from '../../services/domain/prestador.service';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { avaliacaoService } from '../../services/domain/avaliacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvaliacoesDTO } from '../../models/avaliacoes.dto';
import { refDTO } from '../../models/InternalClasses/ref.dto';
import { IonRatingComponent } from '../../components/ion-rating/ion-rating';

/**
 * Generated class for the AvaliacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
  
})
export class AvaliacaoPage {

  formGroup: FormGroup;
  cliente_id:refDTO;
  cliente:ClienteDTO;
  prestador_id:refDTO;
  prestador:PrestadorDTO;
  avaliacao:AvaliacoesDTO;

  stars:number;
  avaliado:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuider:FormBuilder,
    public clienteService:ClienteService,
    public prestadorService:PrestadorService,
    public avalicaoService : avaliacaoService,
    public storage:StorageService) {

      this.formGroup = this.formBuider.group({
        comentario:['',Validators.required], 
    })

  }

  ionViewDidLoad() {
    let pedido = this.navParams.get("pedido");
    this.prestador = this.navParams.get("prestador");
    this.prestador_id = {id:this.prestador.id};

    let localUser = this.storage.getLocalUser();
    if(localUser &&  localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.cliente = response;
        this.cliente_id = {id:response['id']};
      })
    }else{
      this.navCtrl.setRoot("HomePage");
    }

  }

  getImageIfExists(){
        this.prestadorService.getImageFromBucket(this.prestador.id)
          .subscribe(response =>{
            this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${this.prestador.id}.jpg`;
          },
        error=>{})
  }

  clickStars(stars){
      console.log("essa porra deu certo:"+stars)
      this.stars = stars;

  }

  avaliar(){

    this.avaliacao={
      id:null,
      cliente:this.cliente_id,
      prestador:this.prestador_id,
      estrelas:this.stars,
      comentario:this.formGroup.value.comentario
    }
    
    console.log(this.avaliacao);

    this.avaliado = true;
    this.avalicaoService.insert(this.avaliacao)
    .subscribe(response=>{

    })
  }

  setCategoriasPage(){
    this.navCtrl.setRoot("CategoriasPage");
  }
}
