import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestadorPage } from './prestador';

@NgModule({
  declarations: [
    PrestadorPage,
  ],
  imports: [
    IonicPageModule.forChild(PrestadorPage),
  ],
})
export class PrestadorPageModule {}
