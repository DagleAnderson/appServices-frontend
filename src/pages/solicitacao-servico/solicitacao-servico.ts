import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../node_modules/@angular/forms';
import { ProfissaoService } from '../../services/domain/profissao.service';
import { ProfissaoDTO } from '../../models/profissao.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { SolicitacaoServicoDTO } from '../../models/solicitacaoServico.dto';

/**
 * Generated class for the SolicitacaoServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao-servico',
  templateUrl: 'solicitacao-servico.html',
})
export class SolicitacaoServicoPage {
  formGroup: FormGroup;
  categorias:CategoriaDTO[];
  profissoes : ProfissaoDTO[];


  solicitacao : SolicitacaoServicoDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder,
     public profissaoService:ProfissaoService,
     public clienteService : ClienteService,
     public storage :StorageService,
     public categoriaService:CategoriaService,
     public alertCtrl: AlertController) {

    this.formGroup = this.formBuider.group({
      cliente :['',Validators],
      categoria:['',Validators.required],
      profissao:['',Validators.required],
      produtoServico:['apartamento',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      itemSolicitacao1:['aaaaaaaaaaaaaaaaaaaaaaaaa',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao2:['aaaaaaaaaaaaaaaaaaaaaaaaa',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao3:['aaaaaaaaaaaaaaaaaaaaaaaaa',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]]
    });
  }

  ionViewDidLoad() {
    this.showCategorias();
  }

  showCategorias(){
    this.categoriaService.findAll()
    .subscribe(response =>{
      this.categorias = response;
      this.formGroup.controls.categoria.setValue(this.categorias[0].id);
      this.updateProfissoes();
    },
    erro=>{})
  }

  updateProfissoes(){
    let categoria_id= this.formGroup.value.categoria;
    this.profissaoService.findByCategoria(categoria_id)
      .subscribe(response =>{
        this.profissoes = response['content'];
        this.formGroup.controls.profissao.setValue(null);
      },
      erro=>{})
  }

  showConfirmation(){
    this.solicitacao = this.formGroup.value;
    console.log(this.formGroup.value.profissao);
    let profissao_id = this.formGroup.value.profissao;
    this.navCtrl.push('ConfirmationSolicitacaoPage',{
      solicitacao:this.solicitacao,profissao_id:profissao_id})
  }
  
  
}
