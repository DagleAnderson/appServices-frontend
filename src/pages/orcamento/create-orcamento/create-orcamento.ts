import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isRightSide } from 'ionic-angular/umd/util/util';

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

  unidadeMd:string = "UN";
  unidadeSigla:string;
  quantidade:number = 1.0;
  quantidadeString:string ='1.0';
  desconto:number=0.00;
  valor:number=0.00;
  subTotal:number=0.00;

  newItem = 0;

  itemObj:ItensOrcamentoDTO; 
      
  listaItens:ItensOrcamentoDTO[]=[];
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder) {

    this.formGroup = this.formBuider.group({
      item:['',Validators.required],
      unidade:[this.unidadeMd,Validators.required],
      quantidade:[ this.quantidade ,Validators.required],
      desconto:[ ,Validators.required],
      valor:[ ,Validators.required],
      subTotal:[ ,Validators.required],
  })


}

  ionViewDidLoad(){
  
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
            unidade : this.formGroup.value.unidade,
            desconto: this.formGroup.value.desconto,
            valor:this.formGroup.value.valor,
            subTotal: this.subTotal
        }
        );
       
        console.log(this.listaItens)

        this.newItem = this.newItem + 1;
  }

  removeItem(removeItem:ItensOrcamentoDTO){
    for(let i=0; i < this.listaItens.length;i++){
      console.log("list:"+this.listaItens[i]);
      if(this.listaItens[i] == removeItem){
        this.listaItens.splice(i,1)
      }
      console.log(this.listaItens)
    }
  }

  viewList(){
    if(this.listaItens.length>0){
        return false;
    }else{
        return true;
    }
  }

  clearValues(){
      this.desconto =0.00;
      this.valor = 0.00;
      this.subTotal =0.00;
  }
  calc(){
    this.subTotal = (this.quantidade*this.valor)-this.desconto;
  }
}
