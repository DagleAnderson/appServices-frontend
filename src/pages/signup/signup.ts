import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private _formGroup: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuider:FormBuilder) {

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

  public get formGroup(): FormGroup {
    return this._formGroup;
  }
  public set formGroup(value: FormGroup) {
    this._formGroup = value;
  }
  
}
