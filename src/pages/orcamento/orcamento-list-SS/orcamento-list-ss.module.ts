import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoListSsPage } from './orcamento-list-ss';

@NgModule({
  declarations: [
    OrcamentoListSsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoListSsPage),
  ],
})
export class OrcamentoListPageModule {}
