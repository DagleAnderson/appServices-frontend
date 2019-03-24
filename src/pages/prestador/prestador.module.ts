import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestadorPage } from './prestador';

import { IonRatingModule } from '../../components/ion-rating.module';

@NgModule({
  declarations: [
    PrestadorPage
  ],
  imports: [
    IonicPageModule.forChild(PrestadorPage),
    IonRatingModule
  ]
})
export class PrestadorPageModule {}
