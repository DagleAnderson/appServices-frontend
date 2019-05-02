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
  templateUrl: 'orcamento-list-ss.html',
})
export class OrcamentoListSsPage {

  orcamentos : OrcamentoDTO[];
  status:Boolean;
  solicitacaoId:string;

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
    this.solicitacaoId =this.navParams.get('solicitacaoId');
    let solicitacao_id = this.navParams.get('solicitacaoId');
    let load = this.presentLoading();  
      this.orcamentoService.findBySolicitacao(solicitacao_id)
      .subscribe(response =>{
        this.orcamentos = response["content"]; 
        this.statusDoOrcamento(this.orcamentos);

        load.dismiss();
      },
      error => {});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }
 
 
  statusDoOrcamento(obj:OrcamentoDTO[]){
    for(let i=0; i < obj.length;i++){    
      if(obj[i].situacao == "PENDENTE"){
              this.status = false;
          }else{
              this.status = true;
          }  
      }
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
