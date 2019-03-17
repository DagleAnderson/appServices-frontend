import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacaoServicoListPage } from './solicitacao-servicoList';

@NgModule({
  declarations: [
    SolicitacaoServicoListPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacaoServicoListPage),
  ],
})
export class SolicitacaoServicoPageModule {}
