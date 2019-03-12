import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SolicitacaoServicoDTO } from "../../models/solicitacaoServico.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class SolicitacaoServicoService{

    constructor(public http :HttpClient){

    }

    insert(obj: SolicitacaoServicoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/solicitacao`,
            obj,
            {
                observe:'response',
                responseType:'text'
            }
        )
    }


}