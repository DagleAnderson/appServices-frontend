import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";
import { PagSeguroDTO } from "../../models/pagSeguro.dto";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs";

@Injectable()
export class PagSeguroService{

    constructor(public http :HttpClient){

    }

    createPayment(obj:ClienteDTO){ 
        return this.http.post<PagSeguroDTO>(`${API_CONFIG.baseUrl}/pagamento/pagseguro-createpayment?cliente=`+obj.id,obj,
        {}
      ) 
    }

    findById(createdpag_id:string):Observable<PagSeguroDTO>{
      return this.http.get<PagSeguroDTO>(`${API_CONFIG.baseUrl}/pagamento/pagSeguro/${createdpag_id}`)    
  }

}