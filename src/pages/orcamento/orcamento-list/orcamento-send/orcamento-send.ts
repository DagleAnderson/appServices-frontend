import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrcamentoService } from '../../../../services/domain/orcamento.service';
import { OrcamentoDTO } from '../../../../models/orcamento.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ClienteDTO } from '../../../../models/cliente.dto';
import { refDTO } from '../../../../models/InternalClasses/ref.dto';
import { ClienteService } from '../../../../services/domain/cliente.service';
import { StorageService } from '../../../../services/storage.service';
import { PrestadorDTO } from '../../../../models/prestador.dto';

/**
 * Generated class for the OrcamentoSendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-send',
  templateUrl: 'orcamento-send.html',
})
export class OrcamentoSendPage {

  orcamentos : OrcamentoDTO[];
  prestador: PrestadorDTO;
  cliente:ClienteDTO;
  status:string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService:OrcamentoService,
     public alertController: AlertController,
     public clienteService:ClienteService,
     public loadingCtrl:LoadingController,
     public storage : StorageService
    ) {
  }

  ionViewDidLoad() {
    this.loadOrcamentos();
  }

  loadOrcamentos(){
       
    let localUser = this.storage.getLocalUser(); 
    let load = this.presentLoading();
    
    if(localUser &&  localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response =>{
            this.prestador=response["prestador"];
            console.log(this.prestador);
            console.log(this.prestador.id);
                this.orcamentoService.findByPrestador(this.prestador.id)
                .subscribe(response =>{
                  this.orcamentos = response['content']; 
                  load.dismiss();
                  console.log(this.orcamentos)
              },
      error => {
        load.dismiss();
      });
    })
  }
  else{
      this.navCtrl.setRoot("HomePage");
    }     
  }


    
  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:"Aguarde..."
    });

    loader.present();

    return loader;
  }
 
  
  showOrcamento(orcamento_id:string){

    let viewPrestador = true;
    this.navCtrl.push('OrcamentoDetailsPage',{orcamento_id:orcamento_id, viewPrestador})
  }

  async removeOrcamento(id:string){
    console.log("passei aqui")
    const alert = await this.alertController.create({
      title: '<div align="center">Confirmação &nbsp;&nbsp;<img  src="assets/icon/ok.PNG" height="20 width="20" ></div>',
      message: '<div align="center">Deseja realmente apagar o orcamento #'+id+'</div>',
      buttons: [{
        text: 'Sim',
        handler: () => {
                 this.orcamentoService.delete(id)
                 .subscribe(response=>{
                    this.navCtrl.setRoot("OrcamentoSendPage");
                 },error=>{})

              
        }
      },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }
    ]
    });
     await alert.present();
  }

  doRefresh(refresher) {
    this.loadOrcamentos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}