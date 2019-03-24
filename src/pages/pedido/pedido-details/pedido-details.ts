import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../services/domain/pedido.service';
import { PedidoDTO } from '../../../models/pedido.dto';
import { ItensPedidoDTO } from '../../../models/ItensPedido.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';

/**
 * Generated class for the PedidoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-details',
  templateUrl: 'pedido-details.html',
})
export class PedidoDetailsPage {

  pedido:PedidoDTO;
  itensPedido:ItensPedidoDTO[];
  dateFormatBr:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService:PedidoService,
    public prestadorService:PrestadorService) {
  }

  ionViewDidLoad() {
 
    let pedido_id = this.navParams.get('pedido_id');
    this.pedidoService.findById(pedido_id)
      .subscribe(response =>{
        this.pedido=response;
        this.formatDate(this.pedido);
        this.itensPedido = response['itensPedido'];
        this.getImageIfExists();

       },   
      error =>{})
     
  }

  getImageIfExists(){
    this.prestadorService.getImageFromBucket(this.pedido.prestador.id)
      .subscribe(response =>{
        this.pedido.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.pedido.prestador.id}.jpg`;
      },
    error=>{})
  }

  formatDate(obj:PedidoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }

}
