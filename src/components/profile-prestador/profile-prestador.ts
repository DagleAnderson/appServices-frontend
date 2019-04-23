import { Component, Input } from '@angular/core';
import { PrestadorDTO } from '../../models/prestador.dto';
import { API_CONFIG } from '../../config/api.config';
import { PrestadorService } from '../../services/domain/prestador.service';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the ProfilePrestadorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-prestador',
  templateUrl: 'profile-prestador.html'
})
export class ProfilePrestadorComponent {

  @Input() prestador_id :string;
  @Input() prestador_nomeFantasia :string;
  
  @Input() prestador_slogan :string;
  @Input() prestador_img:string;
  
  prestador: PrestadorDTO;
  bucketUrl: string = API_CONFIG.bucktBaseURL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public prestadorService:PrestadorService
     ) {
    console.log('Hello ProfilePrestadorComponent Component');
  }
  
  ngAfterViewInit(){
  }

  getImageIfExists(){
    this.prestadorService.getImageFromBucket(this.prestador.id)
      .subscribe(response =>{
        this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${this.prestador.id}.jpg`;
      },
    error=>{})
  }


}
