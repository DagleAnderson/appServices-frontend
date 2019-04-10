import { Component,AfterViewChecked } from '@angular/core';

/**
 * Generated class for the PaypalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 declare let paypal:any;
@Component({
  selector: 'paypal',
  templateUrl: 'paypal.html'
})
export class PaypalComponent implements AfterViewChecked{

  addScript:boolean = false;
  finalAmount: number = 1;
  paypalLoad:boolean= true;
  payPalConfig = {
    env:'sandbox',
    client:{
        sandbox:'AbfznHXboGdtc_VGn9zD5k3NI4aWfCgAub69Ja5cQCbWg_Fxe0pE8a8KBaxK2tlTuP3yBV1jxhKS_1CC',
        production:'<your-prodution-key hare>'
    },
    commit:true,
    payment:(data,actions) =>{
       return actions.payment.create({
         payment:{
           transactions:[
             {
               amount:{total:this.finalAmount, currency:'USD'}
             } 
           ]
         }
       })
    },
    onAuthorize: (data,actions)=>{
      return actions.payment.execute().then((payment) =>{
          //pagamento efetuado com sucesso
      } )
    }
  }

  ngAfterViewChecked():void{
    if(!this.addScript){
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.payPalConfig,'#paypal-checkout-bnt');
        this.paypalLoad=false;
      })
    }
  }
  addPaypalScript(): any {
    this.addScript = true;
    return new Promise((resolve,reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  constructor() {
    console.log('Hello PaypalComponent Component');
  }

}
