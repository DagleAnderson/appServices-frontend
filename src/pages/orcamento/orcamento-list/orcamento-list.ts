import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';

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

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService:OrcamentoService,
     public loadingCtrl:LoadingController
    ) {
  }

  ionViewDidLoad() {
   this.loadOrcamentos();
  }

  loadOrcamentos(){
    let load = this.presentLoading();
    this.orcamentoService.findAll()
     .subscribe(response =>{
       this.orcamentos = response; 
       load.dismiss();
       console.log(this.orcamentos)
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
