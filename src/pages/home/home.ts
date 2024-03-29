import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from '../../../node_modules/ionic-angular/navigation/ionic-page';
import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';
import {CredenciaisDTO} from '../../models/credenciais.dto';
import {AuthService} from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds:CredenciaisDTO = {
     email:"",
     senha:""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth:AuthService ) {

  }

  ionViewWillEnter() {   
      this.menu.swipeEnable(false); 
  } 
 
  ionViewDidLeave() {   
      this.menu.swipeEnable(true);  
  } 

  ionViewDidEnter(){
    this.auth.RefreshToken()
    .subscribe(response =>{
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{});
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{});
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
}
