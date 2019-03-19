import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';

/**
 * Generated class for the OrcamentoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-list',
  templateUrl: 'orcamento-list.html',
})
export class OrcamentoListPage {

  orcamentos : OrcamentoDTO[];
  status:string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService:OrcamentoService
    ) {
  }

  ionViewDidLoad() {
   
     this.orcamentoService.findAll()
      .subscribe(response =>{
        this.orcamentos = response; 
      },
      error => {});

  }
  
  showOrcamento(orcamento_id:string){
    this.navCtrl.push('OrcamentoDetailsPage',{orcamento_id:orcamento_id})
  }
}
