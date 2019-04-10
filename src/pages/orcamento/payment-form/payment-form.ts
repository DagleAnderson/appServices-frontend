import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';

/**
 * Generated class for the PaymentFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-form',
  templateUrl: 'payment-form.html',
})
export class PaymentFormPage {

  orcamento: OrcamentoDTO;
  listaItens:ItensOrcamentoDTO[];

  parcelas:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  formGroup : FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder:FormBuilder ) {

    this.orcamento = this.navParams.get('orcamento');
    this.listaItens = this.navParams.get('listaItens')
    console.log(this.orcamento);
    this.formGroup = this.formBuilder.group({
      
      numeroDeParcelas:[1,Validators.required],
      "@type":["pagamentoComDinheiro",Validators.required]
    })
      
  }

 nextPage(){
    this.orcamento.formaDePagamento = this.formGroup.value;
    console.log(this.orcamento);
    console.log(this.listaItens);

    this.navCtrl.push("ConfirmationOrcamentoPage",{orcamento:this.orcamento,listaItens:this.listaItens});
 }

}
