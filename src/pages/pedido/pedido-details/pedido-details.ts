import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../../services/domain/pedido.service';
import { PedidoDTO } from '../../../models/pedido.dto';
import { ItensPedidoDTO } from '../../../models/ItensPedido.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { ClienteDTO } from '../../../models/cliente.dto';
import { ClienteService } from '../../../services/domain/cliente.service';
import { EnderecoDTO } from '../../../models/endereco';
import { AtendimentoDTO } from '../../../models/InternalClasses/atendimento.dto';

/**
 * Generated class for the PedidoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-details',
  templateUrl: 'pedido-details.html',
})
export class PedidoDetailsPage {

  pedido:PedidoDTO;
  prestador:PrestadorDTO;
  cliente:ClienteDTO;
  endereco:EnderecoDTO;
  itensPedido:ItensPedidoDTO[];
  atendimento : AtendimentoDTO;
 

  telefones:string[];

  dateFormatBr:string;
  viewPrestador:Boolean = false;
  atendimentoRealizado: boolean =false;
  atendimentoNaoRealizado: boolean =false;
  viewPedido:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService:PedidoService,
    public prestadorService:PrestadorService,
    public clienteService:ClienteService) {
  }

  ionViewDidLoad() {
 
    let pedido_id = this.navParams.get('pedido_id');
     this.viewPrestador = this.navParams.get('viewPrestador');
     this.viewPedido = this.navParams.get('viewPedido');
     console.log(  this.viewPedido );
    this.pedidoService.findById(pedido_id)
      .subscribe(response =>{
        this.pedido=response;
        this.itensPedido = response['itensPedido'];

        if(this.viewPrestador){
            this.clienteService.findById(response['cliente'].id)
            .subscribe(response=>{
                this.cliente = response;
                this.endereco = response['endereco'];
                this.telefones = response['telefones']
                this.getImageIfExists();
            })
        }else{
            this.prestadorService.findByid(response['prestador'].id)
            .subscribe(response=>{
              this.prestador = response;
              this.telefones = response['telefones'];
              this.endereco = response['endereco'];
              this.getImageIfExists();

            })
          }
       },   
      error =>{})
     
  }

  getImageIfExists(){
    if(this.viewPrestador){
      this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response =>{
        this.cliente.imageUrl = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${this.cliente.id}.jpg`;
      },
    error=>{})

    }else{
      this.prestadorService.getImageFromBucket(this.prestador.id)
        .subscribe(response =>{
          this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${this.prestador.id}.jpg`;
        },
      error=>{})
    }
  }

  /** formatDate(obj:PedidoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }
*/

atendimentoStatus(status:string){
  this.pedido.atendimento = status;
  console.log(this.pedido);
  this.pedidoService.findById(this.pedido.id)
  .subscribe(response =>{
    this.atendimento ={atendimento:response['atendimento']};

    this.atendimento.atendimento = status;

    console.log(this.atendimento)
    this.pedidoService.put(this.pedido,this.atendimento)
    .subscribe(response =>{
              
    })
  })

  if(status == 'REALIZADO'){
    this.atendimentoNaoRealizado = true;

    this.navCtrl.setRoot("AvaliacaoPage",{pedido:this.pedido,prestador:this.prestador});
    
   
  }else{
    this.atendimentoNaoRealizado = true;
  }

}

setCategoriasPage(){
  this.navCtrl.setRoot("CategoriasPage")
}

}
