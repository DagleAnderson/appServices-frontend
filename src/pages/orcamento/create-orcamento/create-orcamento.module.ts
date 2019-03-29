import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrcamentoPage } from './create-orcamento';

@NgModule({
  declarations: [
    CreateOrcamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrcamentoPage)
  ],
})
export class CreateOrcamentoPageModule {}
