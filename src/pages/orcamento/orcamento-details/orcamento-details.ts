import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';

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

  orcamento : OrcamentoDTO;
  itensOrcamento : ItensOrcamentoDTO[]; 
  status:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orcamentoService:OrcamentoService) {
  }

  ionViewDidLoad() {
 
    let orcamento_id = this.navParams.get('orcamento_id');
    this.orcamentoService.findById(orcamento_id)
      .subscribe(response =>{
        this.orcamento=response;
        this.statusDoOrcamento(this.orcamento.situacao);
        this.itensOrcamento = response['itensOrcamento'];
       },   
      error =>{})
       
     


     
  }
  
  statusDoOrcamento(obj:string){
      if(obj == "PENDENTE"){
          this.status = false;
        }else{
          this.status = true;
        }
  }

}
