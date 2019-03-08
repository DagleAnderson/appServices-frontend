import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrestadorDTO } from '../../models/prestador.dto';
import { PrestadorService } from '../../services/domain/prestador.service';

/**
 * Generated class for the PrestadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestador',
  templateUrl: 'prestador.html',
})
export class PrestadorPage {
  
  prestadores:PrestadorDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public prestadorService:PrestadorService) {
  }

  ionViewDidLoad() {
    let profissao_id = this.navParams.get('profissao_id');
    this.prestadorService.findByPrestador(profissao_id)
      .subscribe(response =>{
        this.prestadores=response['content'];
       },
      error =>{})
  }
}
