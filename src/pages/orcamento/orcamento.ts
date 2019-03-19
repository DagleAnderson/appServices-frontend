import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../models/orcamento.dto';
import { OrcamentoService } from '../../services/domain/orcamento.service';

/**
 * Generated class for the OrcamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {

  orcamentos : OrcamentoDTO[];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService: OrcamentoService
    ) {
  }

}
