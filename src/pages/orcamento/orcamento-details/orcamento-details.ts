import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrcamentoDTO } from '../../../models/orcamento.dto';
import { OrcamentoService } from '../../../services/domain/orcamento.service';
import { ItensOrcamentoDTO } from '../../../models/ItensOrcamento.dto';
import { PrestadorService } from '../../../services/domain/prestador.service';
import { API_CONFIG } from '../../../config/api.config';
import { PrestadorDTO } from '../../../models/prestador.dto';
import { refDTO } from '../../../models/ref.dto';
import { FormaDePagamentoDTO } from '../../../models/FormaDePagamento.dto';

/**
 * Generated class for the OrcamentoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orcamento-details',
  templateUrl: 'orcamento-details.html',
})
export class OrcamentoDetailsPage {

  orcamento : OrcamentoDTO;
  prestador_id : refDTO;
  prestador : PrestadorDTO;

  itensOrcamento : ItensOrcamentoDTO[]; 
  formaDePagamento: FormaDePagamentoDTO;
  dateFormatBr : string;
  position:number[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orcamentoService:OrcamentoService,
    public prestadorService:PrestadorService) {
  }

  ionViewDidLoad() {
 
    let orcamento_id = this.navParams.get('orcamento_id');
    this.orcamentoService.findById(orcamento_id)
      .subscribe(response =>{
        this.orcamento=response;
        this.itensOrcamento = response['itensOrcamento'];
        this.checkForma(this.orcamento);
        
        this.prestador_id = response['prestador'];
        this.prestadorService.findByid(this.prestador_id.id)
        .subscribe(response=>{
            this.prestador = response;
        })
        
        this.getImageIfExists();
       },   
      error =>{})
     
  }
  checkForma(formaDePagamento: OrcamentoDTO): any {
      if(this.orcamento.formaDePagamento["@type"] == "pagamentoComDinheiro"){
        this.orcamento.formaDePagamento["@type"] ="Dinheiro";
      }else{
        this.orcamento.formaDePagamento["@type"] ="Cartão"
      }
  }

  getImageIfExists(){
    this.prestadorService.getImageFromBucket(this.prestador_id.id)
      .subscribe(response =>{
        this.prestador.imageUrl = `${API_CONFIG.bucktBaseURL}/cp${this.prestador_id.id}.jpg`;
      },
    error=>{})
  }

 /**  formatDate(obj:OrcamentoDTO){
    let dateRead;

        dateRead = obj.data.toString();
        let yaer = dateRead.substring(0,4);
        let month= dateRead.substring(5,7);
        let day =  dateRead.substring(8,10);

        this.dateFormatBr = day+"-"+month+"-"+yaer;
        console.log(this.dateFormatBr);   
  }*/

  viewPerfilPrestador(prestador_id:number){
    this.navCtrl.push('ProfilePrestadorPage',{prestador_id:prestador_id})
  }
  

}
