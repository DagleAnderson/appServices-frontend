import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";


@Injectable()
export class PayPalService{


    constructor(public http :HttpClient){

    }

    
    makePayment(soma){ 
        return this.http.post(`${API_CONFIG.baseUrl}/paypal/make/payment?soma=`+ soma,{}) 
          .map ((response: Response) => response.json ()); 
      }


    completePayment(paymentId, payerId) {
      return this.http.post(`${API_CONFIG.baseUrl}/paypal/complete/payment?paymentId=` + paymentId + `&payerId=` + payerId , {})
        .map((response: Response) => response.json());
    }


}