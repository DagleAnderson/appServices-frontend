import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoService } from '../../../../services/domain/orcamento.service';
import { OrcamentoDTO } from '../../../../models/orcamento.dto';

/**
 * Generated class for the OrcamentoSendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-send',
  templateUrl: 'orcamento-send.html',
})
export class OrcamentoSendPage {

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
        console.log(this.orcamentos)
      },
      error => {});

  }
  
  showOrcamento(orcamento_id:string){

    let viewPrestador = true;
    this.navCtrl.push('OrcamentoDetailsPage',{orcamento_id:orcamento_id, viewPrestador})
  }

}
