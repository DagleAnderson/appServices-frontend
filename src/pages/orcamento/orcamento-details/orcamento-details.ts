import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { refDTO } from '../../../models/InternalClasses/ref.dto';
import { FormaDePagamentoDTO } from '../../../models/FormaDePagamento.dto';
import { StorageService } from '../../../services/storage.service';
import { ClienteService } from '../../../services/domain/cliente.service';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { SituacaoDTO } from '../../../models/InternalClasses/situacao.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ClienteDTO } from '../../../models/cliente.dto';
import { PedidoDTO } from '../../../models/pedido.dto';
import { PedidoService } from '../../../services/domain/pedido.service';
import { EnderecoDTO } from '../../../models/endereco';

/**
 * Generated class for the OrcamentoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-details',
  templateUrl: 'orcamento-details.html',
})
export class OrcamentoDetailsPage {

  pedido:PedidoDTO;
  orcamento_id:refDTO;
  orcamento : OrcamentoDTO;
  prestador_id : refDTO;
  prestador : PrestadorDTO;
  cliente_id:refDTO;
  cliente : ClienteDTO;
  situacaoOrc:SituacaoDTO;
  endereco:EnderecoDTO;



  itensOrcamento : ItensOrcamentoDTO[]; 
  formaDePagamento: FormaDePagamentoDTO;
  dateFormatBr : string;
  position:number[];

  confirmation:string;
  aprovado:boolean;
  viewPrestador:boolean=false;
  data:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertController: AlertController,
    public orcamentoService:OrcamentoService,
    public pedidoService:PedidoService,
    public storage : StorageService,
    public prestadorService:PrestadorService,
    public clienteService:ClienteService,
    public solicitacaoService:SolicitacaoServicoService) {
  }

  ionViewDidLoad() {
    this.getDate();
    this.viewPrestador = this.navParams.get("viewPrestador");
    let orcamento_id = this.navParams.get('orcamento_id');
    this.orcamentoService.findById(orcamento_id)
      .subscribe(response =>{
        this.orcamento=response;
        this.orcamento_id ={id:response['id']};
        this.itensOrcamento = response['itensOrcamento'];
        this.checkForma(this.orcamento);
        
        this.prestador_id = response['prestador'];
        this.prestadorService.findByid(this.prestador_id.id)
        .subscribe(response=>{
            this.prestador = response;   
            if(!this.viewPrestador){  
              this.endereco = response['endereco'];
            }
            this.prestador_id ={id:response['id']};
        },
        error=>{})

        this.cliente_id = response['cliente'];
        this.clienteService.findById(this.cliente_id.id)
        .subscribe(response =>{
          this.cliente = response;
           if(this.viewPrestador){   
            this.endereco= response['endereco'];
           }
          this.cliente_id = {id:response['id']};

        },
        error=>{})
        
        this.getImageIfExists();
       },   
      error =>{})
     
  }
  checkForma(formaDePagamento: OrcamentoDTO): any {
      if(this.orcamento.formaDePagamento["@type"] == "pagamentoComDinheiro"){
        this.orcamento.formaDePagamento["@type"] ="Dinheiro";
      }else{
        this.orcamento.formaDePagamento["@type"] ="Cartão"
      }
  }

  getImageIfExists(){
      if(!this.viewPrestador){
          this.prestadorService.getImageFromBucket(this.prestador_id.id)
            .subscribe(response =>{
              this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.prestador_id.id}.jpg`;
            },
          error=>{})
      }else{
        this.clienteService.findById(this.cliente_id.id)
        .subscribe(response =>{

          this.cliente.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.cliente.id}.jpg`;

        },error=>{})
      }    
  }

 /**  formatDate(obj:OrcamentoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }*/

  viewPerfilPrestador(prestador_id:number){
    this.navCtrl.push('ProfilePrestadorPage',{prestador_id:prestador_id})
  }

  async refrashStatus(situacao:string){ 
    if(situacao == 'APROVADO'){
            const alert = await this.alertController.create({
              title: '<div align="center">Confirmação &nbsp;&nbsp;<img  src="assets/icon/ok.PNG" height="20 width="20" ></div>',
              message: '<div align="center">Deseja realmente aprovar este orçamento?</div>',
              buttons: [{
                text: 'Sim',
                handler: () => {
                  console.log('Confirm Okay');                      
                        let localUser = this.storage.getLocalUser();
                        if(localUser &&  localUser.email){

                            this.orcamentoService.findById(this.orcamento.id)
                            .subscribe(response=>{
                                  this.situacaoOrc = {situacao:response['situacao']};

                                  console.log(this.situacaoOrc);

                                  this.situacaoOrc.situacao = situacao;
                                  
                                  this.orcamentoService.put(this.orcamento,this.situacaoOrc)
                                  .subscribe(response=>{
                                      this.confirmation = response.headers.get('location');
                                      console.log(this.confirmation);
                                  
                                    this.aprovado = true;
 
                                }) 

                            },error=>{})
     
                      }else{
                        this.navCtrl.setRoot("HomePage");
                      }
                }
              },
                {
                  text: 'Não',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel: blah');
                  }
                }
            ]
            });

            await alert.present();
        }
      if(situacao=='ANALISE'){
        let localUser = this.storage.getLocalUser();
                        if(localUser &&  localUser.email){

                            this.orcamentoService.findById(this.orcamento.id)
                            .subscribe(response=>{
                                  this.situacaoOrc = {situacao:response['situacao']};

                                  console.log(this.situacaoOrc);

                                  this.situacaoOrc.situacao = situacao;
                                  
                                  this.orcamentoService.put(this.orcamento,this.situacaoOrc)
                                .subscribe(response=>{
                                  this.confirmation = response.headers.get('location');
                                  console.log(this.confirmation);
                                  
                                  this.navCtrl.setRoot("OrcamentoListPage");
                              
                                }) 

                            })
                      
                              
                      }else{
                        this.navCtrl.setRoot("HomePage");
                      }
      }  
      
      if(situacao == 'REJEITADO'){
        const alert = await this.alertController.create({
          title: '<div align="center">Rejeição &nbsp;&nbsp;<img  src="assets/icon/x.PNG" height="20 width="20" ></div>',
          message: '<div align="center">Deseja realmente rejeitar este orçamento?</div>',
          buttons: [{
            text: 'Sim',
            handler: () => {
              console.log('Confirm Okay');                      
                    let localUser = this.storage.getLocalUser();
                    if(localUser &&  localUser.email){

                        this.orcamentoService.findById(this.orcamento.id)
                        .subscribe(response=>{
                              this.situacaoOrc = {situacao:response['situacao']};

                              console.log(this.situacaoOrc);

                              this.situacaoOrc.situacao = situacao;
                              
                              this.orcamentoService.put(this.orcamento,this.situacaoOrc)
                            .subscribe(response=>{
                              this.confirmation = response.headers.get('location');
                              console.log(this.confirmation);
                              
                              this.navCtrl.setRoot("OrcamentoListPage");
                              
                            }) 

                        })
                  
                          
                  }else{
                    this.navCtrl.setRoot("HomePage");
                  }
            }
          },
            {
              text: 'Não',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel: blah');
              }
            }
        ]
        });

        await alert.present();
    }

  }

  getDate() {
    var data = new Date();
    let newDate =data.getDate()+"/"+"0"+(data.getMonth()+1) +"/"+data.getFullYear();
     
    this.data = newDate;
  }

  generatePedido(){
      
    let localUser = this.storage.getLocalUser();
    if(localUser &&  localUser.email){
        this.clienteService.findByEmail(localUser.email)
        .subscribe(response =>{

            this.prestador_id ={id :response['prestador'].id};
            
            this.pedido = {
              id:null,
              produtoServico:this.orcamento.produtoServico,
              prestador:this.prestador_id,
              data:this.data,
              cliente:this.cliente_id,
              itensPedido: this.orcamento.itensOrcamento
              .map(
                  item =>{
                    return{
                      id:item.id,
                      item:item.item,
                      quantidade:item.quantidade, 
                      unidade:item.unidade,
                      desconto:item.desconto,
                      valor:item.valor,
                      subTotal:item.subTotal,
              }}),
              desconto:this.orcamento.desconto,
              total:this.orcamento.total,
              formaDePagamento:this.orcamento.formaDePagamento,
              atendimento:"1",
              orcamento:this.orcamento_id
            }

            console.log(this.pedido);
          
           this.pedidoService.insert(this.pedido)
          .subscribe(response=>{
            this.confirmation = response.headers.get('location');
            console.log(this.confirmation);
         
          })   

   
        })      
  }else{
    this.navCtrl.setRoot("HomePage");
  }

  }
  

  setCategoriasPage(){
    this.navCtrl.setRoot("CategoriasPage");

    const alert = this.alertController.create({
      title: '<div align="center">Sua Solicitação continuará aberta para novos orçamentos!</div>',
      message: '<div align="center">Se deseja fechar e não receber mais orçamentos vá em :<strong> Menu  > Minhas solicitações. </strong></div>',
      buttons: [
        {   
            text:'ok'
        },
     ]
    });

     alert.present();
   }


}
