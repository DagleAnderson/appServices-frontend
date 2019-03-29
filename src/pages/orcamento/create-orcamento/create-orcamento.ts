import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  quantidade:number = 1;
  desconto:number=0.00;
  valor:number=0.00;
  subTotal:number=0.00;

  newItem = 0;

  /**itemObj:ItensOrcamentoDTO = {
    id:" ",
    item:" ",
    quantidade:0,
    desconto:0,
    valor:0,
    subTotal:0
  }; */

  itemObj:ItensOrcamentoDTO; 
      
  listaItens:ItensOrcamentoDTO[]=[];
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder,) {

    this.formGroup = this.formBuider.group({
      item:['',Validators.required],
      quantidade:[ this.quantidade ,Validators.required],
      desconto:[ ,Validators.required],
      valor:[ ,Validators.required],
      subTotal:[ ,Validators.required],
  })


}

  ionViewDidLoad(){
  
  }

  increment(){
    this.quantidade = this.quantidade + 1;
    this.clearValues();
  }

  decrement(){ 
   if(this.quantidade<=1){  
   }else{
    this.quantidade = this.quantidade - 1;
  }
  this.clearValues();
  }

  /**this.itemObj.id = null,
        this.itemObj.item= this.formGroup.value.item;
        this.itemObj.quantidade = this.quantidade;
        this.itemObj.desconto = this.formGroup.value.desconto;
        this.itemObj.valor = this.formGroup.value.valor;
        this.itemObj.subTotal = this.subTotal; */

           /*  this.itemObj = this.listaItens.map(x =>{
          return{
            id:null,
            item :this.formGroup.value.item,
            quantidade:  this.quantidade,
            desconto: this.formGroup.value.desconto,
            valor:  this.formGroup.value.valor ,
            subTotal: this.subTotal
          }
        })  ;*/


  addItem(){ 

        this.listaItens.push({
            id:null,
            item :this.formGroup.value.item,
            quantidade:  this.quantidade,
            desconto: this.formGroup.value.desconto,
            valor:  this.formGroup.value.valor ,
            subTotal: this.subTotal
        }
        );
       
        console.log(this.listaItens)

        this.newItem = this.newItem + 1;
  }

  removeItem(idItem:string){
    for(let i=0; i < this.listaItens.length;i++){
      if(this.listaItens[i].id == idItem ){
        this.listaItens.splice(i,1)
      }
      console.log(this.listaItens)
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
