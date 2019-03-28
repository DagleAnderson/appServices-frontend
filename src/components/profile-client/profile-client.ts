import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ClienteService } from '../../services/domain/cliente.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';

/**
 * Generated class for the ProfileClientComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-client',
  templateUrl: 'profile-client.html'
})
export class ProfileClientComponent {
  @Input() cliente_id :string;
  @Input() cliente_nome :string;
  @Input() cliente_sobrenome:string;
  @Input() cliente_img:string;
  cliente: ClienteDTO;
  bucketUrl: string = API_CONFIG.bucktBaseURL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService:ClienteService
  ) {

  }

  ngAfterViewInit(){
}

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response =>{
        this.cliente.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.cliente.id}.jpg`;
      },
    error=>{})
  }

}
