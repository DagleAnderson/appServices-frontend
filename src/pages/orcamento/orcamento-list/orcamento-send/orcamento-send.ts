import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoService } from '../../../../services/domain/orcamento.service';
import { OrcamentoDTO } from '../../../../models/orcamento.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
  status:string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public orcamentoService:OrcamentoService,
     public alertController: AlertController
    ) {
  }

  ionViewDidLoad() {
   
     this.orcamentoService.findAll()
      .subscribe(response =>{
        this.orcamentos = response; 
        console.log(this.orcamentos)
      },
      error => {});

  }
  
  showOrcamento(orcamento_id:string){

    let viewPrestador = true;
    this.navCtrl.push('OrcamentoDetailsPage',{orcamento_id:orcamento_id, viewPrestador})
  }


  async removeOrcamento(id:string){
    console.log("passei aqui")
    const alert = await this.alertController.create({
      title: '<div align="center">Confirmação &nbsp;&nbsp;<img  src="assets/icon/ok.PNG" height="20 width="20" ></div>',
      message: '<div align="center">Deseja realmente deletar este orçamento?</div>',
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

}
