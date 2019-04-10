import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { ItensSolicitacaoServicoDTO } from '../../../models/ItensSolicitacaoServico.dto';
import { refDTO } from '../../../models/InternalClasses/ref.dto';
import { ProfissaoService } from '../../../services/domain/profissao.service';
import { ProfissaoDTO } from '../../../models/profissao.dto';
import { ClienteService } from '../../../services/domain/cliente.service';
import { ClienteDTO } from '../../../models/cliente.dto';
import { API_CONFIG } from '../../../config/api.config';
import { Subscriber } from 'rxjs';

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
  dateFormatBr : string;
  viewPrestador : boolean =false; 
  profissao_id:refDTO;
  profissao:ProfissaoDTO;
  cliente_id:refDTO;
  cliente: ClienteDTO;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public solicitacaoService:SolicitacaoServicoService,
    public profissaoService : ProfissaoService,
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    this.viewPrestador = this.navParams.get("viewPrestador");   
    let solicitacao_id = this.navParams.get('solicitacao_id');
    this.solicitacaoService.findById(solicitacao_id)
      .subscribe(response =>{
        this.solicitacao=response;
        this.itensSolicitacao = response['itemServico'];
        this.profissao_id = response['profissao'];
        this.cliente_id = response['cliente'];

        this.profissaoService.findById(this.profissao_id.id)
        .subscribe(response=>{
          this.profissao = response;
          
          this.questionsList(this.profissao);
        })

        this.profissaoService.findById(this.profissao_id.id)
        .subscribe(response=>{
          this.profissao = response;
          
          this.questionsList(this.profissao);
        })

        this.clienteService.findById(this.cliente_id.id)
        .subscribe(response=>{
            this.cliente = response;
        })
        this.getImageIfExists();


       },   
      error =>{})

    }

  /** formatDate(obj:SolicitacaoServicoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }*/

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.solicitacao.cliente.id)
      .subscribe(response =>{
        this.cliente.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.solicitacao.cliente.id}.jpg`;
      },
    error=>{})
  }

  questionsList(profissao : ProfissaoDTO){
    
    console.log(profissao.id);
          //Construção e Reforma
    if ((profissao.id =="1") ||(profissao.id =="2") || (profissao.id =="3") 
       || (profissao.id =="4") ||(profissao.id =="5") || (profissao.id =="6")
       || (profissao.id =="7") ||(profissao.id =="8") || (profissao.id =="9")
       || (profissao.id =="10") ||(profissao.id =="11") || (profissao.id =="12")){
      this.itensSolicitacao[0].questions ="Defeitos e Circunstâncias do local :" ;
      this.itensSolicitacao[1].questions ="Quantidade de comodos :" ;
      this.itensSolicitacao[2].questions ="Comodos e medidas :" ;
      this.itensSolicitacao[3].questions ="cidade:";
      this.itensSolicitacao[4].questions ="Local do imóvel";
      this.itensSolicitacao[5].questions ="Prazo de entrega:"
      this.itensSolicitacao[6].questions ="Desejo do cliente:"
    }else
          //Tecnologia e Eletronicos   
    if ((profissao.id =="13") ||(profissao.id =="14") || (profissao.id =="15") 
    || (profissao.id =="16") ||(profissao.id =="17") || (profissao.id =="18")
    || (profissao.id =="19") ||(profissao.id =="20") || (profissao.id =="21")
    || (profissao.id =="22") ||(profissao.id =="23") || (profissao.id =="24")){
      this.itensSolicitacao[0].questions ="Defeitos e Circunstâncias do produto:" ;
      this.itensSolicitacao[1].questions ="Quantidade do produto:" ;
      this.itensSolicitacao[2].questions ="Ano do produto:" ;
      this.itensSolicitacao[3].questions ="Cidade:";
      this.itensSolicitacao[4].questions ="Local de Atendimento:";
      this.itensSolicitacao[5].questions ="Desejo do cliente:";
    }else 
          //Veículos Automotores
    if ((profissao.id =="25") ||(profissao.id =="26") || (profissao.id =="27") 
    || (profissao.id =="28") ||(profissao.id =="29") || (profissao.id =="30")){
      this.itensSolicitacao[0].questions ="Defeitos e Circunstâncias do Veículo:" ;
      this.itensSolicitacao[1].questions ="Quantidade de veículos:" ;
      this.itensSolicitacao[2].questions ="Ano do veículo:" ;
      this.itensSolicitacao[3].questions ="Cidade:";
      this.itensSolicitacao[4].questions ="Local de atendimento :";
      this.itensSolicitacao[5].questions ="Desejo do cliente:";

    }else
          //Saúde e Bem estar
    if ((profissao.id =="31") ||(profissao.id =="32") || (profissao.id =="33")){
      this.itensSolicitacao[0].questions ="causas ou sintomas que o levou a essa solicitação de serviço:" ;
      this.itensSolicitacao[1].questions ="Quantidade de pessoas:" ;
      this.itensSolicitacao[2].questions ="Média de idade:" ;
      this.itensSolicitacao[3].questions ="Média de idade :";
      this.itensSolicitacao[3].questions ="Cidade:";
      this.itensSolicitacao[4].questions ="Local de atendimento :";
      this.itensSolicitacao[5].questions ="Desejo do cliente:";

    }
           //Educação
    if ((profissao.id =="34") ||(profissao.id =="35")){
      this.itensSolicitacao[0].questions ="Circunstâncias que o levou a essa solicitação de serviço:" ;
      this.itensSolicitacao[1].questions ="Quantidade de pessoas :" ;
      this.itensSolicitacao[2].questions ="Média de idade :" ;
      this.itensSolicitacao[3].questions ="Cidade:";
      this.itensSolicitacao[4].questions ="Local de atendimento :";
      this.itensSolicitacao[5].questions ="Nível de conhecimento :";
      this.itensSolicitacao[6].questions ="Desejo do cliente:";
    }
           //Elétro e Domestricos
    if ((profissao.id =="36") ||(profissao.id =="37")){
          this.itensSolicitacao[0].questions ="Defeitos e Circunstâncias do produto ou serviço:" ;
          this.itensSolicitacao[1].questions ="Quantidade de itens para serviço:" ;
          this.itensSolicitacao[2].questions ="Tempo de uso:" ;
          this.itensSolicitacao[3].questions ="Cidade:";
          this.itensSolicitacao[4].questions ="Imagens";
          this.itensSolicitacao[4].questions ="Local de atendimento :";
          this.itensSolicitacao[5].questions ="Desejo do cliente:";

        }          
  }


  showCreateOrcamento(solicitacao_id:string){
    this.navCtrl.push('CreateOrcamentoPage',{solicitacao_id:solicitacao_id});
  }

}
