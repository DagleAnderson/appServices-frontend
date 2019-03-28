import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacaoServicoDetailsPage } from './solicitacao-servico-details';
import { ProfileClientModule } from '../../../components/profile-client.module';

@NgModule({
  declarations: [
    SolicitacaoServicoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacaoServicoDetailsPage),  
    ProfileClientModule
  ],
})
export class SolicitacaoServicoDetailsPageModule {}
