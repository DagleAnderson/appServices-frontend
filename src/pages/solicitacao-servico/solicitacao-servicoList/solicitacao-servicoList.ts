import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { API_CONFIG } from '../../../config/api.config';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';

/**
 * Generated class for the SolicitacaoServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao-servico',
  templateUrl: 'solicitacao-servicoList.html',
})
export class SolicitacaoServicoListPage {

  solicitacoes : SolicitacaoServicoDTO[];
  dateFormatBr :string[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public servicoService: SolicitacaoServicoService
    ) {
  }

  ionViewDidLoad() {
    this.servicoService.findAll()
    .subscribe(response =>{
      this.solicitacoes = response;
      this.formatDateList(this.solicitacoes);
    },
    error => {});
  }

  showSolicitacao(solicitacao_id:string){
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id})
  }

  showListOrcamentos(solicitacaoId:string){
    this.navCtrl.push('OrcamentoListSsPage',{solicitacaoId:solicitacaoId})
  }

  formatDateList(obj:SolicitacaoServicoDTO[]){
    let dateRead;
    for(let i=0; i < obj.length;i++){  
        dateRead = obj[i].data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        let newDate = day+"/"+month+"/"+yaer
        
        console.log(newDate);
    }
  }
  
}
