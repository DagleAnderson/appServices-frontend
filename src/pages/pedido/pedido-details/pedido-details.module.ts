import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoDetailsPage } from './pedido-details';

@NgModule({
  declarations: [
    PedidoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetailsPage),
  ],
})
export class PedidoDetailsPageModule {}
