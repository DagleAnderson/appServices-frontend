import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';

/**
 * Generated class for the ConfirmationOrcamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation-orcamento',
  templateUrl: 'confirmation-orcamento.html',
})
export class ConfirmationOrcamentoPage {

  orcamento: OrcamentoDTO;
  itensOrcamento:ItensOrcamentoDTO[];

  descTotalOrc:number = 0.00;
  descItem:number[] = [];
  descTotalItem:number = 0.00;
  totalDeItens: number=0.00;

  confirmation:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orcamentoService:OrcamentoService) {
  }

  ionViewDidLoad() {
    this.orcamento = this.navParams.get('orcamento');
    this.itensOrcamento = this.navParams.get('listaItens');
    this. contItens();
    this.checkForma(this.orcamento);

    console.log(this.orcamento);
  }

  contItens(){
    for(let i =0 ; i < this.itensOrcamento.length;i++){
      this.totalDeItens = this.totalDeItens + 1;
    } 
  }

  checkForma(formaDePagamento: OrcamentoDTO): any {
    if(this.orcamento.formaDePagamento["@type"] == "pagamentoComDinheiro"){
      this.orcamento.formaDePagamento["@type"] ="Dinheiro";
    }else{
      this.orcamento.formaDePagamento["@type"] ="Cartão"
    }
}
  

  submitOrcamento(){
    if(this.orcamento.formaDePagamento["@type"] == "Dinheiro"){
      this.orcamento.formaDePagamento["@type"] ="pagamentoComDinheiro";
    }else{
      this.orcamento.formaDePagamento["@type"] ="pagamentoComCartao"
    }

    this.orcamentoService.insert(this.orcamento) 
    .subscribe(response=>{
      this.confirmation = response.headers.get('location');
      console.log(this.confirmation);
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
