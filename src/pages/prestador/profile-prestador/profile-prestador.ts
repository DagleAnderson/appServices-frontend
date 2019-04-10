import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';
import { CurriculoDTO } from '../../../models/curriculo.dto';
import { CursosDTO } from '../../../models/cursos.dto';
import { ExperienciasDTO } from '../../../models/experiencias.dto';
import { AvaliacoesDTO } from '../../../models/avaliacoes.dto';
import { ClienteDTO } from '../../../models/cliente.dto';
import { PagSeguroService } from '../../../services/domain/pagSeguro.service';
import { PagSeguroDTO } from '../../../models/pagSeguro.dto';
import { StorageService } from '../../../services/storage.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { refDTO } from '../../../models/ref.dto';


/**
 * Generated class for the ProfilePrestadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-prestador',
  templateUrl: 'profile-prestador.html',
})
export class ProfilePrestadorPage {

  prestador: PrestadorDTO;
  gatilhoMedia : string[] =[' '];
  curriculo:CurriculoDTO;
  cursos : CursosDTO[];
  experiencias: ExperienciasDTO[];
  cliente:ClienteDTO;
  avaliacoes: AvaliacoesDTO[];
  numAvalicoes:number = 0;
  createadPag_id:refDTO;
  url:string;
  pagSeguro:PagSeguroDTO;

  pagSeguroUrl:String;

  redirect_url:string;
  
  

  bucketUrl: string = API_CONFIG.bucktBaseURL;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private inAppBrowser:InAppBrowser,
    public prestadorService:PrestadorService,
    public pagSeguroService:PagSeguroService,
    public storage : StorageService,
    public clienteService:ClienteService ) {
  }

  log(valor){
    console.log(valor);
  }
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser &&  localUser.email){ 
          let prestador_id = this.navParams.get('prestador_id');
          this.clienteService.findByEmail(localUser.email)
          .subscribe(response =>{
              this.cliente =response;
              
                this.prestadorService.findByid(prestador_id)
                .subscribe(response =>{
                        this.curriculo = response['curriculo'];
                        
                        if(this.curriculo != null){
                          this.cursos = this.curriculo.cursos;
                        }else{
                            this.cursos = Array[' '];
                        }
                        
                        if(this.curriculo != null){
                          this.experiencias = this.curriculo.experiencias;
                        }else{
                          this.experiencias = Array[' '];
                        }
                        this.prestador = response;
                        this.avaliacoes = response['avaliacoes'];
                        
                        this.numAvalicoes = this.avaliacoes.length;
                        this.getImageIfExists();
                
                    },
                    error => {
                      if(error.status == 403){
                        this.navCtrl.setRoot("ProfissaoPage");
                      }
                    });
              })
    }else{
      this.navCtrl.setRoot("HomePage");
    }    
    }

    getImageIfExists(){
      this.prestadorService.getImageFromBucket(this.prestador.id)
        .subscribe(response =>{
          this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.prestador.id}.jpg`;
        },
      error=>{})
  }

   pagSeguroCreate(){
    this.pagSeguroService.createPayment(this.cliente)
    .subscribe(response =>{
      this.pagSeguro = response;
      console.log(this.pagSeguro);
      console.log(this.url);
      console.log("https://pagseguro.uol.com.br/v2/checkout/payment.html?code="+this.pagSeguro.URLCreatePag);
       
     this.createadPag_id ={id:response['id']};

      this.pagSeguroService.findById(this.createadPag_id.id)
      .subscribe(response=>{
          this.pagSeguroUrl = response['URLCreatePag'];
          console.log(this.pagSeguroUrl);
      })

        //this.inAppBrowser.create(response['URLCreatePag'],'_blank')
     
    })
  } 
  
}
