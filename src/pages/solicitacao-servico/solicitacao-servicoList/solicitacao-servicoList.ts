import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { StorageService } from '../../../services/storage.service';
import { ClienteDTO } from '../../../models/cliente.dto';
import { refDTO } from '../../../models/InternalClasses/ref.dto';

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
  cliente : refDTO;
  userId:string;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public servicoService: SolicitacaoServicoService,
     public clienteService : ClienteService,
     public storage :StorageService
    ) {
  }

  ionViewDidLoad() {
    this.getUser();
   
  }
  getUser(){
    let localUser = this.storage.getLocalUser();
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                  this.cliente={id:response["id"]};
                  console.log(this.cliente);

                   this.servicoService.findAllByCliente(this.cliente.id)
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

  SolicitacaoList(cliente:ClienteDTO){
    
  }

  showSolicitacao(solicitacao_id:string){
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id})
  }

  showListOrcamentos(solicitacaoId:string){
    this.navCtrl.push('OrcamentoListSsPage',{solicitacaoId:solicitacaoId})
  }
  
}
