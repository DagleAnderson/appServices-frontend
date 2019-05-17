import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PedidoDTO } from '../../../../models/pedido.dto';
import { PedidoService } from '../../../../services/domain/pedido.service';
import { ClienteDTO } from '../../../../models/cliente.dto';
import { ClienteService } from '../../../../services/domain/cliente.service';
import { StorageService } from '../../../../services/storage.service';
import { refDTO } from '../../../../models/InternalClasses/ref.dto';
import { PrestadorDTO } from '../../../../models/prestador.dto';

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
  prestador:PrestadorDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService: PedidoService,
    public clienteService : ClienteService,
    public storage :StorageService,
    public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    this.loadPedidos();
  }

  loadPedidos(){
    let load = this.presentLoading();
    let localUser = this.storage.getLocalUser(); 
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                  this.prestador=response["prestador"];
                  console.log(this.prestador);

                  this.pedidoService.findByPrestador(this.prestador.id)
                  .subscribe(response =>{
                    this.pedidos = response['content'];
                    load.dismiss();
                  },
                  error => {
                    load.dismiss();
                  });
          })
        }else{
          this.navCtrl.setRoot("HomePage");
        }         
  }

 presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }
  
  showPedido(pedido_id:string){
    let viewPrestador = true;
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id,viewPrestador:viewPrestador})
  }

  doRefresh(refresher) {
    this.loadPedidos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
