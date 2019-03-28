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

  catSelected:number=0;
  contador:number = 1;
  dias:number =1;

  index:number=0;
  localAt:string=" ";

  indexIdade:number=0;
  mediaIdade:string=" ";

  indexNivel:number=0;
  nivel:string=" ";

  indexCidade:number =0;
  cidade:string = " ";


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
      categoria:['',Validators.required],
      profissao:['',Validators.required],
      produtoServico:['apartamento',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      itemSolicitacao1:['casa má dividida, com pintura desbotada e parede com danos graves',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao2:[this.contador,[Validators.required]],
      itemSolicitacao3:['imagens com tamanho da area do local',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao4:["",[Validators.required]],
      itemSolicitacao5:['15 dias',[Validators.required,Validators.minLength(5),Validators.maxLength(25)]],
      itemSolicitacao6:['pintura completa do local com detalhes em algumas par',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      itemSolicitacao7:['-------------------',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      itemSolicitacao8:['-------------------',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]]

    
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
    this.catSelected = this.formGroup.value.categoria;
    
    this.verifyCategoria(this.catSelected);
    this.solicitacao = this.formGroup.value;

    let profissao_id = this.formGroup.value.profissao;
    this.navCtrl.push('ConfirmationSolicitacaoPage',{
      solicitacao:this.solicitacao,profissao_id:profissao_id,catSelected:this.catSelected})
  }

  verifyCategoria(catSelected: number): any {

    this.formGroup.value.itemSolicitacao2 = this.contador;
    this.formGroup.value.itemSolicitacao5 = this.local(this.index);
    this.formGroup.value.itemSolicitacao4 = this.cidades(this.indexCidade);

    if (catSelected == 1){
      if(this.dias==1){
         this.formGroup.value.itemSolicitacao6 = this.dias + " dia";
      }else{
        this.formGroup.value.itemSolicitacao6= this.dias + " dias";
      }
    }
    if (catSelected == 4){
        this.formGroup.value.itemSolicitacao3 = this.mediaDeIdade(this.indexIdade);
    }if(catSelected ==6){
      this.formGroup.value.itemSolicitacao3 = this.mediaDeIdade(this.indexIdade);
      this.formGroup.value.itemSolicitacao6 = this.nivelSelect(this.indexNivel);
    }

  }
  cidades(indexCidade: number): any {
    switch (indexCidade) {
      case 1: 
          return this.localAt= "Barreiras";
      case 2: 
          return this.localAt= "Luis Eduardo";
    }
  }


  increment(){this.contador = this.contador + 1;}

  decrement(){ 
   if(this.contador<=1){  
   }else{
    this.contador = this.contador - 1;}
  }

  incrementDias(){this.dias = this.dias + 1;}

  decrementDias(){ 
   if(this.dias<=1){  
   }else{
    this.dias = this.dias - 1;}
  }

  local(index:number):string{
    switch (index) {
      case 1: 
          return this.localAt= "Dentro da cidade";
      case 2: 
          return this.localAt= "Fora da cidade";
      case 3: ;
          return this.localAt="Minha residência";
      case 4: 
          return this.localAt= "Minha empresa";
      case 5:
          return this.localAt= "Consigo levar até você";
      case 6:
          return this.localAt= "Posso ir até você";
      default:
          return this.localAt = " ";
    }

  }
  

  mediaDeIdade(indexIdade:number):string{
    switch (indexIdade) {
      case 1: 
          return this.mediaIdade= "Entre 4 e 8 anos";
      case 2: 
          return this.mediaIdade= "Entre 8 e 12 anos";
      case 3: ;
          return this.mediaIdade="Entre 12 e 16 anos";
      case 4: 
          return this.mediaIdade= "Acima de 16 anos";
      default:
          return this.mediaIdade = " ";
    }
  }

  nivelSelect(indexNivel:number):string{
    switch (indexNivel) {
      case 1: 
          return this.nivel= "Básico";
      case 2: 
          return this.nivel= "Intermediário";
      case 3: ;
          return this.nivel="Avançado";
      default:
          return this.nivel = " ";
    }
  }
  
}
