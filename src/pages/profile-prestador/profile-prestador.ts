import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrestadorDTO } from '../../models/prestador.dto';
import { PrestadorService } from '../../services/domain/prestador.service';
import { API_CONFIG } from '../../config/api.config';

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
