import { NgModule } from '@angular/core';
import { ProfileClientComponent } from './profile-client/profile-client';
import { IonicPageModule } from 'ionic-angular/module';

@NgModule({
	declarations: [ProfileClientComponent],
	imports: [
		IonicPageModule.forChild(ProfileClientComponent)
	],
	exports: [ProfileClientComponent]
})
export class ProfileClientModule {}
