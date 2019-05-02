import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfissaoDTO } from '../../models/profissao.dto';
import { ProfissaoService } from '../../services/domain/profissao.service';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

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
  categoria : CategoriaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService:CategoriaService,
    public profissaoService:ProfissaoService,
    public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    let load = this.presentLoading(); 
    let categoria_id = this.navParams.get('categoria_id');
    
    this.categoriaService.findById(categoria_id)
    .subscribe(response =>{
        this.categoria = response;
       
    })

    this.profissaoService.findByCategoria(categoria_id)
      .subscribe(response =>{
        this.profissoes=response['content'];
        load.dismiss();
       },
      error =>{
        load.dismiss();
      })
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }

  showPrestador(profissao_id:string){
    this.navCtrl.push('PrestadorPage',{profissao_id:profissao_id})
  }

}
