import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../node_modules/@angular/forms';
import { CidadesService } from '../../services/domain/cidades.service';
import { EstadoService } from '../../services/domain/estados.service';
import { Subscriber } from '../../../node_modules/rxjs';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados:EstadoDTO[];
  cidades:CidadeDTO[];
  s
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuider:FormBuilder,
    public cidadeService:CidadesService,
    public estadoService:EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuider.group({
        nome:['Jessica',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        sobrenome:['Lima',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        dataNascimento:['',[Validators.required]],
        rg:['1432756311',[Validators.required]],
        cpfOuCnpj:['13933194083',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
        email:['jessica@hotmail.com',[Validators.required,Validators.email]],
        tipoPessoa:['1',[Validators.required]],
        sexo:['1',[Validators.required]],
        senha:['1234536',[Validators.required]],
        rua:['teste',[]],
        complemento:['teste',[]],
        numero:['255',[Validators.required]],
        bairro:['barreiras 1',[Validators.required]],
        cep:['47800000',[Validators.required]],
        telefone1:['7788118448',[Validators.required]],
        telefone2:['',[]],
        estado:['',[Validators.required]],
        cidade:['',[Validators.required]]
      });
  }


  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response =>{
          this.estados = response;
          this.formGroup.controls.estado.setValue(this.estados[0].id);
          this.updateCidades();
        },erro=>{})
  }

  updateCidades(){
    let estado_id= this.formGroup.value.estado;
    this.cidadeService.findAll(estado_id)
      .subscribe(response =>{
        this.cidades = response;
        this.formGroup.controls.cidade.setValue(null);
      },
      erro=>{})
  }
  
  signupUser(){
    console.log(this.formGroup.value);
    this.formGroup.value.dataNascimento = this.formatDate(this.formGroup.value.dataNascimento);
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
      .subscribe(respose=>{
        this.showInsertOk();
      },
      erro=>{})
  }

  formatDate(dataNascimento:string): string {
    console.log(dataNascimento);
    let yaer = dataNascimento.substring(0,4);
    let month = dataNascimento.substring(5,7);
    let day = dataNascimento.substring(8,10);

     return  day+"/"+month+'/'+yaer;
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:"Cadastro efetuado com sucesso",
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
}
