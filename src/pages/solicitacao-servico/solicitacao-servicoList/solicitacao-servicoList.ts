import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { StorageService } from '../../../services/storage.service';
import { ClienteDTO } from '../../../models/cliente.dto';
import { refDTO } from '../../../models/InternalClasses/ref.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  formGroup:FormGroup;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder,
     public solicitacaoService: SolicitacaoServicoService,
     public clienteService : ClienteService,
     public storage :StorageService,
     public loadingCtrl:LoadingController
    ) {

      this.formGroup = this.formBuider.group({
        filtro:['',Validators.required]
      });
  }

  ionViewDidLoad() {
    this.loadSolicitacao();
   
  }
   loadSolicitacao(){
    let localUser = this.storage.getLocalUser();
    let load = this.presentLoading(); 
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                  this.cliente={id:response["id"]};
                  console.log(this.cliente);

                   this.solicitacaoService.findAllByCliente(this.cliente.id)
                  .subscribe(response =>{

                  this.solicitacoes = response ["content"];
                  load.dismiss();
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

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }


  findByCliAndSituacao(){
    let cli =  this.cliente.id;
    let situacao = this.formGroup.value.filtro;
    let load = this.presentLoading(); 

    if(situacao==0){
      this.solicitacaoService.findAllByCliente(cli)
      .subscribe(response =>{
          this.solicitacoes = response ["content"];
          load.dismiss();
      })
    }else{
      this.solicitacaoService.findByCliAndSituacao(cli,situacao)
      .subscribe(response =>{
          this.solicitacoes = response ["content"];
          load.dismiss();
      })
   }

  }

  showSolicitacao(solicitacao_id:string){
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id})
  }

  showListOrcamentos(solicitacaoId:string){
    this.navCtrl.push('OrcamentoListSsPage',{solicitacaoId:solicitacaoId})
  }

  doRefresh(refresher) {
    this.loadSolicitacao();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
}
