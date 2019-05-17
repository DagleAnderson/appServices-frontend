import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { refDTO } from '../../../models/InternalClasses/ref.dto';
import { StorageService } from '../../../services/storage.service';

/**
 * Generated class for the OrcamentoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-list',
  templateUrl: 'orcamento-list.html',
})
export class OrcamentoListPage {

  orcamentos : OrcamentoDTO[];
  status:string;
  cliente:refDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService:OrcamentoService,
     public loadingCtrl:LoadingController,
     public clienteService:ClienteService,
     public storage : StorageService
    ) {
  }

  ionViewDidLoad() {
   this.loadOrcamentos();
  }

  loadOrcamentos(){
    let localUser = this.storage.getLocalUser(); 
    let load = this.presentLoading();
    
    if(localUser &&  localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response =>{
            this.cliente={id:response["id"]};
            console.log(this.cliente);
                this.orcamentoService.findByCliente(this.cliente.id)
                .subscribe(response =>{
                  this.orcamentos = response['content']; 
                  load.dismiss();
                  console.log(this.orcamentos)
              },
      error => {
        load.dismiss();
      });
    })
  }
  else{
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
 
  
  showOrcamento(orcamento_id:string){
    this.navCtrl.push('OrcamentoDetailsPage',{orcamento_id:orcamento_id})
  }

  doRefresh(refresher) {
    this.loadOrcamentos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
