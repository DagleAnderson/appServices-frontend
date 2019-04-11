import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoDetailsPage } from './orcamento-details';
import { ProfilePrestadorModule } from '../../../components/profile-prestador.module';
import { ProfileClientModule } from '../../../components/profile-client.module';

@NgModule({
  declarations: [
    OrcamentoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoDetailsPage),
    ProfilePrestadorModule,
    ProfileClientModule
  ],
})
export class OrcamentoDetailsPageModule {}
