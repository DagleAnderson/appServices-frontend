import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoServicoDTO } from '../../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../../services/domain/solicitacaoServico.service';
import { ClienteService } from '../../../../services/domain/cliente.service';
import { StorageService } from '../../../../services/storage.service';
import { refDTO } from '../../../../models/ref.dto';
import { ClienteDTO } from '../../../../models/cliente.dto';

/**
 * Generated class for the SolicitacaoReceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao-received',
  templateUrl: 'solicitacao-received.html',
})
export class SolicitacaoReceivedPage {
  solicitacoes : SolicitacaoServicoDTO[];
  idUser : refDTO;
  prestador:refDTO;
  profissao:refDTO;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public servicoService: SolicitacaoServicoService,
     public clienteService : ClienteService,
     public storage :StorageService
    ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                  this.idUser ={id:response["id"]};
                  this.prestador =response["prestador"];

                  this.servicoService.findAllByProfissao(this.prestador.id)
                  .subscribe(response =>{
                       this.solicitacoes = response ["content"];
                   },
                  error => {});
              },
              
              error => {
                if(error.status == 403){
                  this.navCtrl.setRoot("HomePage");
                }
              }); 
              
             
            
        }else{
          this.navCtrl.setRoot("HomePage");
        }     
  }

  showSolicitacao(solicitacao_id:string){
    let viewPrestador =true;
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id,viewPrestador})
  }

  showListOrcamentos(solicitacaoId:string){
    this.navCtrl.push('OrcamentoListSsPage',{solicitacaoId:solicitacaoId})
  }

}
