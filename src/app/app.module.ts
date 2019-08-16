import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { ErrorHandler, NgModule, PACKAGE_ROOT_URL} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from "@ionic-native/splash-screen";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CategoriaService } from "../services/domain/categoria.service";
import { ErrorInterceptorProvider } from "../interceptors/error-interceptor";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProfissaoService } from '../services/domain/profissao.service';
import { PrestadorService } from '../services/domain/prestador.service';
import { SolicitacaoServicoService } from '../services/domain/solicitacaoServico.service';
import { OrcamentoService } from '../services/domain/orcamento.service';
import { PedidoService } from '../services/domain/pedido.service';
import { PagSeguroService } from '../services/domain/pagSeguro.service';
import { avaliacaoService } from '../services/domain/avaliacao.service';
import { ImageUtilService } from '../services/image-utl.service';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents:[
    MyApp
  ],
  providers:[
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProfissaoService,
    PrestadorService,
    SolicitacaoServicoService,
    OrcamentoService,
    PedidoService,
    PagSeguroService,
    avaliacaoService,
    ImageUtilService,
    PhotoViewer,
    InAppBrowser
  ]
})
export class AppModule {}
