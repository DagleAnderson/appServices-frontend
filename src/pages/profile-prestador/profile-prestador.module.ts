import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePrestadorPage } from './profile-prestador';
import { IonRatingComponent } from '../../components/ion-rating/ion-rating';

@NgModule({
  declarations: [
    ProfilePrestadorPage,
    IonRatingComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfilePrestadorPage)


  ],
})
export class ProfilePrestadorPageModule {}
