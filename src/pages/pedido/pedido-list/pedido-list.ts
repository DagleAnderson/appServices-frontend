import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../services/domain/pedido.service';
import { PedidoDTO } from '../../../models/pedido.dto';

/**
 * Generated class for the PedidoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-list',
  templateUrl: 'pedido-list.html',
  
})
export class PedidoListPage {
  pedidos: PedidoDTO[];

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

  
  showPedidos(pedido_id:string){
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id})
  }

}
