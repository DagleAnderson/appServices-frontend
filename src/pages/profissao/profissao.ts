import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissaoDTO } from '../../models/profissao.dto';
import { ProfissaoService } from '../../services/profissao.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profissaoService:ProfissaoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.profissaoService.findByCategoria(categoria_id)
      .subscribe(response =>{
        this.profissoes=response['content'];
       },
      error =>{})
  }

  showPrestadores(profissao_id:string){
    this.navCtrl.push('PrestadorPage',{profissao_id:profissao_id})
  }

}
