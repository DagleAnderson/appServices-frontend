import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public pedidoService: PedidoService,
    public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
   this.loadPedidos();
  }

  loadPedidos(){
    let load = this.presentLoading();
    this.pedidoService.findAll()
    .subscribe(response =>{
      this.pedidos = response['content'];
      load.dismiss();
    },
    error => {
      load.dismiss();
    });
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }
  
  showPedidos(pedido_id:string){
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id})
  }

  doRefresh(refresher) {
    this.loadPedidos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
