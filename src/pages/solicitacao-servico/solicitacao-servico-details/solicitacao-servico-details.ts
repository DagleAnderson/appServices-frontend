import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { ItensSolicitacaoServicoDTO } from '../../../models/ItensSolicitacaoServico.dto';

/**
 * Generated class for the SolicitacaoServicoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao-servico-details',
  templateUrl: 'solicitacao-servico-details.html',
})
export class SolicitacaoServicoDetailsPage {
  solicitacao : SolicitacaoServicoDTO;
  itensSolicitacao : ItensSolicitacaoServicoDTO[]; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public solicitacaoService:SolicitacaoServicoService) {
  }

  ionViewDidLoad() {
    let solicitacao_id = this.navParams.get('solicitacao_id');
    this.solicitacaoService.findById(solicitacao_id)
      .subscribe(response =>{
        this.solicitacao=response;
        this.itensSolicitacao = response['itemServico'];
        this.questionsList();
       },   
      error =>{})

     
  }

  questionsList(){
      this.itensSolicitacao[0].questions ="Detalhes do produto ou serviço:" ;
      this.itensSolicitacao[1].questions ="Defeitos e Circunstâncias:" ;
      this.itensSolicitacao[2].questions ="Desejo do cliente:" ;
  }
}
