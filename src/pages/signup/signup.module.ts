import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadesService } from '../../services/domain/cidades.service';
import { EstadoService } from '../../services/domain/estados.service';

@NgModule({
  declarations: [
    SignupPage,

  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    CidadesService,
    EstadoService
  ]
})
export class SignupPageModule {}
