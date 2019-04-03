import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitacaoServicoService } from '../../../services/domain/solicitacaoServico.service';
import { SolicitacaoServicoDTO } from '../../../models/solicitacaoServico.dto';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { ClienteService } from '../../../services/domain/cliente.service';
import { StorageService } from '../../../services/storage.service';
import { ClienteDTO } from '../../../models/cliente.dto';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { refDTO } from '../../../models/ref.dto';

/**
 * Generated class for the CreateOrcamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-orcamento',
  templateUrl: 'create-orcamento.html',
})
export class CreateOrcamentoPage {
  formGroup: FormGroup;
  data: string;

  //unidades de medidas 
  unidadeMd:string = "UN";
  unidadeSigla:string = "UN";
  quantidade:number = 1.0;
  quantidadeString:string ='1.0';

 //itens 
  desconto:number=0.00;
  valor:number=0.00;
  subTotal:number=0.00;

  //total do orçamento
  descontoGeral:number = 0.00;
  total:number = 0.00;
  descTotalItem : number = 0.00;


  solicitacao:SolicitacaoServicoDTO;
  orcamento: OrcamentoDTO;
  cliente:refDTO;
  Prestador:refDTO;
  itemObj:ItensOrcamentoDTO;     
  listaItens:ItensOrcamentoDTO[]=[];
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder,
     public solicitacaoService:SolicitacaoServicoService,
     public storage : StorageService,
     public clienteService:ClienteService) {

    this.formGroup = this.formBuider.group({
      item:['',Validators.required],
      unidade:[this.unidadeMd,Validators.required],
      quantidade:[ this.quantidade ,Validators.required],
      desconto:[ ,Validators.required],
      valor:[ ,Validators.required],
      subTotal:[ ,Validators.required],
      descontoGeral:[ ,Validators.required],
      total:[ , Validators.required] 
  })


}

  ionViewDidLoad(){
    this.getDate();
      let solicitacao_id = this.navParams.get("solicitacao_id");

      this.solicitacaoService.findById(solicitacao_id)
      .subscribe(response =>{
              this.solicitacao = response;
      })

  
  }

  increment(){
    if(this.unidadeSigla =="UN"){
      this.quantidade = this.quantidade + 1;
      this.quantidadeString = this.quantidade.toFixed(1);
      this.quantidade = Number(this.quantidadeString);


    }else{
     this.quantidade = this.quantidade + 0.1;
     this.quantidadeString = this.quantidade.toFixed(1);
     this.quantidade =  Number(this.quantidadeString);

    }
    this.clearValues();
  }

  decrement(){ 
    if(this.unidadeSigla == "UN"){
      if(this.quantidade<=1){  
      }else{
        this.quantidade = this.quantidade - 1;
        this.quantidadeString = this.quantidade.toFixed(1);
        this.quantidade =  Number(this.quantidadeString);
      }
    }else{
      if(this.quantidade<=1){  
      }else{
        this.quantidade = this.quantidade - 0.1;
        this.quantidadeString = this.quantidade.toFixed(1);
        this.quantidade =  Number(this.quantidadeString);
      } 
    }  
    this.clearValues();
  }

  unidadeType(){
    
    if(this.unidadeMd == "1"){
      this.quantidade = 1;
      this.quantidadeString = "1.0";
      this.unidadeSigla="UN"
    }else if(this.unidadeMd == "2"){
      this.quantidade = 1;
      this.quantidadeString = "1.0";
      this.unidadeSigla="MT"
    }else if(this.unidadeMd == "3"){
      this.quantidade = 1;
      this.quantidadeString = "1.0";
      this.unidadeSigla="KG"
    }else if(this.unidadeMd == "4"){
      this.quantidade = 1.;
      this.quantidadeString = "1.0";
      this.unidadeSigla ="LT"
    }else{
      this.quantidade = 1.00;
      this.unidadeSigla ="UN"
    }
  }

  addItem(){  

        this.listaItens.push({
            id:null,
            item :this.formGroup.value.item,
            quantidade:  this.quantidade,
            unidade : this.unidadeSigla,
            desconto: this.formGroup.value.desconto,
            valor:this.formGroup.value.valor,
            subTotal: this.subTotal
        }
        );
        this.clearValues();

        this.calcTotal();
  }

  removeItem(removeItem:ItensOrcamentoDTO){
    for(let i=0; i < this.listaItens.length;i++){
      console.log("list:"+this.listaItens[i]);
      if(this.listaItens[i] == removeItem){
        this.listaItens.splice(i,1)
      }
      console.log(this.listaItens)
    }

    this.calcTotal();
  }

  clearValues(){
      this.desconto = 0;
      this.valor = 0;
      this.subTotal = 0;
  }
  calcItem(){
    this.subTotal = (this.quantidade*this.valor)-this.desconto;

  }

  calcTotal(){
    this.total = 0;
    for(let i =0;i < this.listaItens.length ; i++)  {
        this.total = (this.total + this.listaItens[i].subTotal);

        this.descTotalItem = (this.descTotalItem +  this.listaItens[i].desconto);
    }

    this.total = (this.total - this.descontoGeral);
    
  }

  getDate() {
    var data = new Date();
    let newDate =data.getDate()+"/"+"0"+(data.getMonth()+1) +"/"+data.getFullYear();
     
    this.data = newDate;
  }

  viewList(){
    if(this.listaItens.length>0){
        return false;
    }else{
        return true;
    }
  }

  nextPage(){
    for(let i=0;i < this.listaItens.length ; i++){
      if(this.listaItens[i].unidade =="UN"){    
      this.listaItens[i].unidade ="1";
      }else
      if(this.listaItens[i].unidade =="MT"){    
        this.listaItens[i].unidade ="2";
      }else
      if(this.listaItens[i].unidade =="KG"){    
        this.listaItens[i].unidade ="3";
      }else
      if(this.listaItens[i].unidade =="LT"){    
        this.listaItens[i].unidade ="4";
      }
    }  


    let localUser = this.storage.getLocalUser();
    if(localUser &&  localUser.email){
        this.clienteService.findByEmail(localUser.email)
        .subscribe(response =>{
            this.cliente ={id:response['id']};
            this.Prestador ={id :response['prestador'].id};
            
            this.orcamento = {
              id:null,
              produtoServico:this.solicitacao.produtoServico,
              prestador:this.Prestador,
              data:this.data,
              cliente:this.cliente,
              itensOrcamento: this.listaItens
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
              desconto:this.descontoGeral,
              total:this.total,
              formaDePagamento:null,
              situacao:'1',
              solicitacao:this.solicitacao
            }

            //parâmetros para confirmação

            this.navCtrl.push('PaymentFormPage',
            {
              orcamento:this.orcamento,
              listaItens: this.listaItens,          
            });    
        })      
  }else{
    this.navCtrl.setRoot("HomePage");
  }
}

}
