import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentoDetailsPage } from './orcamento-details';

@NgModule({
  declarations: [
    OrcamentoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentoDetailsPage),
  ],
})
export class OrcamentoDetailsPageModule {}
