import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoSendPage } from './pedido-send';

@NgModule({
  declarations: [
    PedidoSendPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoSendPage),
  ],
})
export class PedidoSendPageModule {}
