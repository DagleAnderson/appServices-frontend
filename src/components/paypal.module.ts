import { NgModule } from '@angular/core';
import { PaypalComponent } from './paypal/paypal';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular/module';

@NgModule({
	declarations: [PaypalComponent],
	imports: [
		FormsModule,
		IonicPageModule.forChild(PaypalComponent)
	],
	exports: [PaypalComponent]
})
export class PayPalModule {}
