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
  dateFormatBr : string;

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
        this.formatDate(this.orcamento);
        this.itensOrcamento = response['itensOrcamento'];

       },   
      error =>{})
     
  }

  formatDate(obj:OrcamentoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }
}
