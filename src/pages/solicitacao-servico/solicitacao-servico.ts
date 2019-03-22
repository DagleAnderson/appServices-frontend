import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../node_modules/@angular/forms';
import { ProfissaoService } from '../../services/domain/profissao.service';
import { ProfissaoDTO } from '../../models/profissao.dto';
import { SolicitacaoServicoService } from '../../services/domain/solicitacaoServico.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

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

  cliente : ClienteDTO;
  profissao:ProfissaoDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuider:FormBuilder,
     public profissaoService:ProfissaoService,
     public solicitacaoService:SolicitacaoServicoService,
     public clienteService : ClienteService,
     public storage :StorageService,
     public categoriaService:CategoriaService,
     public alertCtrl: AlertController) {

    this.formGroup = this.formBuider.group({
      cliente :['',Validators],
      categoria:['',Validators.required],
      profissao:['',Validators.required],
      produtoServico:['',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
      itemSolicitacao1:['',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao2:['',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]],
      itemSolicitacao3:['',[Validators.required,Validators.minLength(10),Validators.maxLength(255)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitacaoServicoPage');
    this.showCategorias();
  }

  requestOrcamento(profissao:string){
    let localUser = this.storage.getLocalUser();
    if(localUser &&  localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response=>{
          this.cliente = response;
             this.formGroup = this.formBuider.group({
                cliente:[this.cliente.id,Validators.required]
              })     
      }, error => {
        if(error.status == 403){
          this.navCtrl.setRoot("HomePage");
        }
      })

      this.profissaoService.findById(profissao)
      .subscribe(response=>{
            this.profissao = response;
              this.formGroup = this.formBuider.group({
                profissao:[this.profissao.id,Validators.required]
              })      
      },erro=>{})  
     
      this.formGroup.value.cliente = this.cliente.id;
      this.formGroup.value.profissao = this.profissao.id;
      
     
      this.solicitacaoService.insert(this.formGroup.value)
        .subscribe(response=>{
          console.log(this.formGroup.value);
             this.showInsertOk();
      },erro=>{});

    }else{
      this.navCtrl.setRoot("HomePage");
    }
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:"Pronto sua solicitação foi enviada.Agora é so aguardar os orçamentos!",
      enableBackdropDismiss:false,
      buttons:[
          {
            text:'ok',
            handler:()=>{
                this.navCtrl.pop();
            }
          }
      ]
    })
    alert.present();
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
  
}
