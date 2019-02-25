import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from '../../../node_modules/ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
