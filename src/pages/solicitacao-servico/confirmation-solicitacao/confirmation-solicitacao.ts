import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ProfissaoService } from '../../../services/domain/profissao.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { StorageService } from '../../../services/storage.service';
import { CategoriaService } from '../../../services/domain/categoria.service';
import { ItensSolicitacaoServicoDTO } from '../../../models/ItensSolicitacaoServico.dto';
import { ProfissaoDTO } from '../../../models/profissao.dto';
import { ClienteDTO } from '../../../models/cliente.dto';

/**
 * Generated class for the ConfirmationSolicitacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation-solicitacao',
  templateUrl: 'confirmation-solicitacao.html',
})
export class ConfirmationSolicitacaoPage {

  solicitacao:SolicitacaoServicoDTO;
  itensSolicitacao:ItensSolicitacaoServicoDTO[];
  cliente : ClienteDTO;
  profissao:ProfissaoDTO;
  confirmation:string;

  catSelected:number=0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public profissaoService:ProfissaoService,
    public clienteService : ClienteService,
    public storage :StorageService,
    public categoriaService:CategoriaService,
    public solicitacaoService : SolicitacaoServicoService
  ) {
  }

  ionViewDidLoad() {
    this.catSelected = this.navParams.get('catSelected');
    let solicitacaoParam = this.navParams.get('solicitacao'); 
      let profissao_id= this.navParams.get('profissao_id');
      this.profissaoService.findById(profissao_id)
      .subscribe(response =>{
          this.profissao = response;
         },   
        error =>{}) 
        
        let localUser = this.storage.getLocalUser();
        if(localUser &&  localUser.email){
            this.clienteService.findByEmail(localUser.email)
              .subscribe(response =>{
                   this.cliente = response;
                   this.solicitacao = {
                     id:null,
                     produtoServico:solicitacaoParam.produtoServico,
                     data:this.getDate(),
                     cliente:{id:response['id']},
                     itemSolicitacao1:solicitacaoParam.itemSolicitacao1,
                     itemSolicitacao2:solicitacaoParam.itemSolicitacao2,
                     itemSolicitacao3:solicitacaoParam.itemSolicitacao3,
                     itemSolicitacao4:solicitacaoParam.itemSolicitacao4,
                     itemSolicitacao5:solicitacaoParam.itemSolicitacao5,
                     itemSolicitacao6:solicitacaoParam.itemSolicitacao6,
                     itemSolicitacao7:solicitacaoParam.itemSolicitacao7,
                     itemSolicitacao8:solicitacaoParam.itemSolicitacao8,
                     profissao:solicitacaoParam.profissao,
                     statusSolicitacao:"1"
                    }; 

                    console.log(this.solicitacao);
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
  getDate(): string {
    var data = new Date();
    let newDate =data.getDate()+"/"+"0"+(data.getMonth()+1) +"/"+data.getFullYear();

    return newDate;
  }

  requestOrcamento(){
    console.log(this.solicitacao);
    var data = new Date();
    console.log("data:"+data.getDate()+"/"+"0"+(data.getMonth()+1) +"/"+data.getFullYear())
      this.solicitacaoService.insert(this.solicitacao) 
      .subscribe(response =>{
        this.confirmation = response.headers.get('location');
      },error =>{
        if (error.status == 403){
          this.navCtrl.setRoot("HomePage");
        }
      });    
   }

   setCategoriasPage(){
    this.navCtrl.setRoot("CategoriasPage");
   }
 
}
