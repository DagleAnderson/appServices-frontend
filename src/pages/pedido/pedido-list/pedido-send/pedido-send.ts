import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PedidoDTO } from '../../../../models/pedido.dto';
import { PedidoService } from '../../../../services/domain/pedido.service';
import { ClienteDTO } from '../../../../models/cliente.dto';
import { ClienteService } from '../../../../services/domain/cliente.service';
import { StorageService } from '../../../../services/storage.service';
import { PrestadorDTO } from '../../../../models/prestador.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  formGroup:FormGroup;

  page:number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public pedidoService: PedidoService,
    public clienteService : ClienteService,
    public storage :StorageService,
    public loadingCtrl:LoadingController) {

      this.formGroup = this.formBuilder.group({
        filtro:['',Validators.required]
      });
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

                  this.pedidoService.findByPrestador(this.prestador.id,this.page)
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

  findByPrestAndSituacao(){
    let prest =  this.prestador.id;
    console.log(prest)
    let situacao = this.formGroup.value.filtro;
    console.log(situacao)
    let load = this.presentLoading(); 
    let localUser = this.storage.getLocalUser();
    
    if(localUser && localUser.email){
        if(situacao==0){
          this.pedidoService.findByPrestador(prest)
          .subscribe(response =>{
              this.pedidos = response ["content"];
              load.dismiss();
          })
        }else{
          this.pedidoService.findByPrestAndSituacao(prest,situacao,this.page)
          .subscribe(response =>{
              this.pedidos = response ["content"];
              load.dismiss();
          })
      }
   }else{
    this.navCtrl.setRoot("HomePage");
  }  
}
  
  showPedido(pedido_id:string){
    let viewPrestador = true;
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id,viewPrestador:viewPrestador})
  }

  doRefresh(refresher) {
    this.page = 0;
    this.pedidos= [];

    this.loadPedidos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadPedidos();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
  


}
