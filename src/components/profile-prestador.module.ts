import { NgModule } from '@angular/core';
import { ProfilePrestadorComponent } from './profile-prestador/profile-prestador';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [ProfilePrestadorComponent],
	imports: [ IonicPageModule.forChild(ProfilePrestadorComponent)],
	exports: [ProfilePrestadorComponent]
})
export class ProfilePrestadorModule {}
