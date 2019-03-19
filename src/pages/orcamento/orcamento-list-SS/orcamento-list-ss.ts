import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
     public orcamentoService:OrcamentoService
    ) {
  }

  ionViewDidLoad() {
    this.solicitacaoId =this.navParams.get('solicitacaoId');
    let solicitacao_id = this.navParams.get('solicitacaoId');
      this.orcamentoService.findBySolicitacao(solicitacao_id)
      .subscribe(response =>{
        this.orcamentos = response["content"]; 
        this.statusDoOrcamento(this.orcamentos)
      },
      error => {});
    
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
}
