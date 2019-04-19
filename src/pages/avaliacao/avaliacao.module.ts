import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoPage } from './avaliacao';
import { ProfilePrestadorModule } from '../../components/profile-prestador.module';
import { IonRatingModule } from '../../components/ion-rating.module';

@NgModule({
  declarations: [
    AvaliacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoPage),
    ProfilePrestadorModule,
    IonRatingModule
  ],
})
export class AvaliacaoPageModule {}
