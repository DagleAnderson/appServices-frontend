import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoDetailsPage } from './orcamento-details';
import { ProfilePrestadorModule } from '../../../components/profile-prestador.module';

@NgModule({
  declarations: [
    OrcamentoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoDetailsPage),
    ProfilePrestadorModule
  ],
})
export class OrcamentoDetailsPageModule {}
