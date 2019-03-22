import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';
import { CurriculoDTO } from '../../../models/curriculo.dto';
import { CursosDTO } from '../../../models/cursos.dto';
import { ExperienciasDTO } from '../../../models/experiencias.dto';
import { AvaliacoesDTO } from '../../../models/avaliacoes.dto';
import { ClienteDTO } from '../../../models/cliente.dto';

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
  curriculo:CurriculoDTO;
  cursos : CursosDTO[];
  experiencias: ExperienciasDTO[];
  cliente:ClienteDTO[];
  avaliacoes: AvaliacoesDTO[];

  bucketUrl: string = API_CONFIG.bucktBaseURL;

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public prestadorService:PrestadorService ) {
  }

  log(valor){
    console.log(valor);
  }
  ionViewDidLoad() {
    let prestador_id = this.navParams.get('prestador_id');
    this.prestadorService.findByid(prestador_id)
    .subscribe(response =>{
        this.curriculo = response['curriculo'];
        this.cursos = this.curriculo.cursos;
        this.experiencias = this.curriculo.experiencias;
        this.avaliacoes = response['avaliacoes'];
        this.prestador = response;
        this.getImageIfExists();
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot("ProfissaoPage");
      }
    });
  }

  getImageIfExists(){
    this.prestadorService.getImageFromBucket(this.prestador.id)
      .subscribe(response =>{
        this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.prestador.id}.jpg`;
      },
    error=>{})
  }

}
