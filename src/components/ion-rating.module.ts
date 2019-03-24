import { NgModule } from '@angular/core';
import { IonRatingComponent } from './ion-rating/ion-rating';
import { IonicPageModule } from 'ionic-angular/module';

@NgModule({
	declarations: [IonRatingComponent],
	imports: [ IonicPageModule.forChild(IonRatingComponent)],
	exports: [IonRatingComponent]
})
export class IonRatingModule {}
