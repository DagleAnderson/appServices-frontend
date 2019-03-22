import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoListPage } from './pedido-list';

@NgModule({
  declarations: [
    PedidoListPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoListPage),
  ],
})
export class PedidoListPageModule {}
