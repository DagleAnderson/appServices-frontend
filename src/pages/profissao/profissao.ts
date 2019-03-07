import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissaoDTO } from '../../models/profissao.dto';

/**
 * Generated class for the ProfissaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profissao',
  templateUrl: 'profissao.html',
})
export class ProfissaoPage {

  profissoes : ProfissaoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.profissoes = [
      {
        id:"1",
        nome:"Pintor"
      },
      {
        id:"2",
        nome:"Pedreiro"
      },
      {
        id:"3",
        nome:"Mecânico"
      },
      {
        id:"4",
        nome:"Técnico em Informática"
      },
      {
        id:"5",
        nome:"Programador"
      },
    ]  
  }

}
