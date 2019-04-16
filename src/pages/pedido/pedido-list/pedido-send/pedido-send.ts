import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../../../models/pedido.dto';
import { PedidoService } from '../../../../services/domain/pedido.service';
import { ClienteDTO } from '../../../../models/cliente.dto';

/**
 * Generated class for the PedidoSendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-send',
  templateUrl: 'pedido-send.html',
})
export class PedidoSendPage {
  pedidos: PedidoDTO[];
  cliente:ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService: PedidoService) {
  }

  ionViewDidLoad() {
      this.pedidoService.findAll()
      .subscribe(response =>{
        this.pedidos = response['content'];
      },
      error => {});
  }

  
  showPedido(pedido_id:string){
    let viewPrestador = true;
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id,viewPrestador:viewPrestador})
  }

}
