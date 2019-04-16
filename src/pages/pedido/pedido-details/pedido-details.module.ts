import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoDetailsPage } from './pedido-details';
import { ProfilePrestadorModule } from '../../../components/profile-prestador.module';
import { ProfileClientModule } from '../../../components/profile-client.module';

@NgModule({
  declarations: [
    PedidoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoDetailsPage),
    ProfilePrestadorModule,
    ProfileClientModule
  ],
})
export class PedidoDetailsPageModule {}
