import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: String = 'HomePage';

  mode:Boolean = false;

  pagesCliente: Array<{title: string, component: String}>;
  pagesPrestador: Array<{title: string, component: String}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService : AuthService
    ){
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesCliente = [
      { title: 'Perfil', component: 'ProfilePage' },
      { title: 'Categarias', component: 'CategoriasPage' },
      {title: 'Minhas Solicitações',component:'SolicitacaoServicoListPage'},
      {title: 'Meus Orçamentos',component:'OrcamentoListPage'},
      {title: 'Meus Pedidos',component:'PedidoListPage'},
      { title: 'Sair', component:''}
    ];

    this.pagesPrestador = [
      { title: 'Meu Perfil Profissional', component: '' },
      {title: 'Solicitações Recebidas',component:''},
      {title: 'Orçamentos Enviadas',component:''},
      {title: 'Pedidos Enviados',component:''},
      { title: 'Sair', component:''}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title:string,component:string}) {
    
    switch(page.title){
      case 'Sair':
        this.authService.logout();
        this.nav.setRoot('HomePage');
        break;
      
      default:
        this.nav.setRoot(page.component); 
    }
  }

  changeMode(){
    console.log(this.mode)
  }

}
