import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SolicitacaoServicoDTO } from '../../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../../services/domain/solicitacaoServico.service';
import { ClienteService } from '../../../../services/domain/cliente.service';
import { StorageService } from '../../../../services/storage.service';
import { refDTO } from '../../../../models/InternalClasses/ref.dto';
import { ClienteDTO } from '../../../../models/cliente.dto';
import { ProfissaoService } from '../../../../services/domain/profissao.service';
import { PrestadorService } from '../../../../services/domain/prestador.service';
import { PrestadorDTO } from '../../../../models/prestador.dto';
import { ProfissaoDTO } from '../../../../models/profissao.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  cliente:ClienteDTO;
  prestador:PrestadorDTO;
  profissao:ProfissaoDTO;
  formGroup : FormGroup;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public solicitacaoService: SolicitacaoServicoService,
     public clienteService : ClienteService,
     public prestadorService:PrestadorService,
     public storage :StorageService,
     public formBuider:FormBuilder,
     public loadingCtrl:LoadingController
    ) {

      this.formGroup = this.formBuider.group({
        filtro:['',Validators.required]
      });

  }

  ionViewDidLoad() {
    this.loadSolicitacaoes(); 
  }

  loadSolicitacaoes(){
    let localUser = this.storage.getLocalUser();
    let load = this.presentLoading(); 
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                  this.idUser ={id:response["id"]};
                  this.prestador =response["prestador"];

                  console.log(this.prestador.id)

                  this.prestadorService.findByid(this.prestador.id)
                  .subscribe(response=>{

                    this.profissao = response['profissao'];

                    console.log(this.profissao)

                    this.solicitacaoService.findAllByProfissao(this.profissao.id)
                    .subscribe(response =>{
                         this.solicitacoes = response ["content"];
                     })

                     load.dismiss();
                  },
                   error => {})
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

  showSolicitacao(solicitacao_id:string){
    let viewPrestador =true;
    this.navCtrl.push('SolicitacaoServicoDetailsPage',{solicitacao_id:solicitacao_id,viewPrestador})
  }

  showListOrcamentos(solicitacaoId:string){
    this.navCtrl.push('OrcamentoListSsPage',{solicitacaoId:solicitacaoId})
  }


  findByProAndSituacao(){
    let prof =  this.profissao.id;
   console.log(prof);
    let situacao = this.formGroup.value.filtro;
    console.log(situacao);
    let load = this.presentLoading(); 

    if(situacao==0){
      this.solicitacaoService.findAllByProfissao(prof)
      .subscribe(response =>{
          this.solicitacoes = response ["content"];
          load.dismiss();
      })
    }else{
      this.solicitacaoService.findByProAndSituacao(prof,situacao)
      .subscribe(response =>{
          this.solicitacoes = response ["content"];
          load.dismiss();
      })
   }
  }


  doRefresh(refresher) {
    this.loadSolicitacaoes();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
