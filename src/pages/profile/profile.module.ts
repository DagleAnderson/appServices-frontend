import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ProfileClientModule } from '../../components/profile-client.module';
import {Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ProfileClientModule
  ],
  providers:[
    Camera
  ]
})
export class ProfilePageModule {}
