import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { PrestadorDTO } from '../../models/prestador.dto';
import { PrestadorService } from '../../services/domain/prestador.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucktBaseURL;
  itens : CategoriaDTO[];
  prestadores:PrestadorDTO[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public categoriaService: CategoriaService,
     public prestadorService:PrestadorService
    ) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response =>{
      this.itens = response;  

     this.prestadorService.findbyPage()
     .subscribe(response=>{
        this.prestadores = response['content'];
     })
    },
    error => {});
  }

  showProfissoes(categoria_id:string){
    this.navCtrl.push('ProfissaoPage',{categoria_id:categoria_id})
  }

  showSolicitacaoServico(){
    this.navCtrl.push('SolicitacaoServicoPage')
  }

  viewPerfilPrestador(prestador_id:number){
    this.navCtrl.push('ProfilePrestadorPage',{prestador_id:prestador_id})
  }
}
