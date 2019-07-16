import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PedidoService } from '../../../services/domain/pedido.service';
import { PedidoDTO } from '../../../models/pedido.dto';
import { ClienteService } from '../../../services/domain/cliente.service';
import { StorageService } from '../../../services/storage.service';
import { refDTO } from '../../../models/InternalClasses/ref.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  pedidos: PedidoDTO[] = [];
  cliente:refDTO;
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
                  this.cliente={id:response["id"]};
                  console.log(this.cliente);

                  this.pedidoService.findByClient(this.cliente.id,this.page)
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
  
  findByCliAndSituacao(){
    let cli =  this.cliente.id;
    console.log(cli)
    let situacao = this.formGroup.value.filtro;
    console.log(situacao)
    let load = this.presentLoading(); 
    let localUser = this.storage.getLocalUser();
    
    if(localUser && localUser.email){
        if(situacao==0){
          this.pedidoService.findByClient(cli)
          .subscribe(response =>{
              this.pedidos = response ["content"];
              load.dismiss();
          })
        }else{
          this.pedidoService.findByCliAndSituacao(cli,situacao,this.page)
          .subscribe(response =>{
              this.pedidos = response ["content"];
              load.dismiss();
          })
      }
   }else{
    this.navCtrl.setRoot("HomePage");
  }  
}

  showPedidos(pedido_id:string){
    this.navCtrl.push('PedidoDetailsPage',{pedido_id:pedido_id})
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
