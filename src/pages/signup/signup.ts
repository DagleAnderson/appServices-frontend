import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../node_modules/@angular/forms';
import { CidadesService } from '../../services/domain/cidades.service';
import { EstadoService } from '../../services/domain/estados.service';
import { Subscriber } from '../../../node_modules/rxjs';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

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
    public estadoService:EstadoService) {

      this.formGroup = this.formBuider.group({
        nome:['teste',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        email:['',[Validators.required,Validators.email]],
        tipo:['',[Validators.required]],
        cpfOuCnpj:['',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
        senha:['',[Validators.required]],
        logradouro:['',[]],
        complemento:['',[]],
        numero:['',[Validators.required]],
        bairro:['',[Validators.required]],
        cep:['',[Validators.required]],
        telefone1:['',[Validators.required]],
        telefone2:['',[]],
        estadoId:['',[Validators.required]],
        cidadeId:['',[Validators.required]]
      });
  }


  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response =>{
          this.estados = response;
          this.formGroup.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades();
        },erro=>{})
  }

  updateCidades(){
    let estado_id= this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response =>{
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },erro=>{})
  }
  
}
