import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoSendPage } from './orcamento-send';

@NgModule({
  declarations: [
    OrcamentoSendPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoSendPage),
  ],
})
export class OrcamentoSendPageModule {}
