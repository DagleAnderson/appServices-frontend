import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacaoServicoDetailsPage } from './solicitacao-servico-details';

@NgModule({
  declarations: [
    SolicitacaoServicoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacaoServicoDetailsPage),
  ],
})
export class SolicitacaoServicoDetailsPageModule {}
