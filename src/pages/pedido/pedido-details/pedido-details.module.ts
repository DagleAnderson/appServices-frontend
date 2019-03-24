import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoDetailsPage } from './pedido-details';
import { ProfilePrestadorModule } from '../../../components/profile-prestador.module';

@NgModule({
  declarations: [
    PedidoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetailsPage),
    ProfilePrestadorModule
  ],
})
export class PedidoDetailsPageModule {}
