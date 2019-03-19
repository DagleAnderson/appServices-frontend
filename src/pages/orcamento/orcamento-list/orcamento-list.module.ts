import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoListPage } from './orcamento-list';

@NgModule({
  declarations: [
    OrcamentoListPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoListPage),
  ],
})
export class OrcamentoListPageModule {}
