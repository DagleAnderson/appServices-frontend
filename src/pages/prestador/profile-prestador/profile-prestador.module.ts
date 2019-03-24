import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePrestadorPage } from './profile-prestador';
import { IonRatingModule } from '../../../components/ion-rating.module';
import { ProfilePrestadorModule } from '../../../components/profile-prestador.module';


@NgModule({
  declarations: [
 ProfilePrestadorPage
  ],
  imports: [
    IonicPageModule.forChild(ProfilePrestadorPage),
    ProfilePrestadorModule,
    IonRatingModule
  ],
})
export class ProfilePrestadorPageModule {}
