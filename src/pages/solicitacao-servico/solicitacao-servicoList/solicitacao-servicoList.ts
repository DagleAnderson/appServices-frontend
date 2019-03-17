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


  bucketUrl: string = API_CONFIG.bucktBaseURL;
  itens : SolicitacaoServicoDTO[];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public servicoService: SolicitacaoServicoService
    ) {
  }

  ionViewDidLoad() {
    this.servicoService.findAll()
    .subscribe(response =>{
      this.itens = response;  
    },
    error => {});
  }

  showSolicitacao(solicitacao_id:string){
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id})
  }
}
