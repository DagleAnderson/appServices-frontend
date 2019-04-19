import { Injectable } from "@angular/core";
import { AvaliacoesDTO } from "../../models/avaliacoes.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class avaliacaoService{

    constructor(public http :HttpClient){
    }

    insert(obj: AvaliacoesDTO){
        return this.http.post(
        `${API_CONFIG.baseUrl}/avaliacao?cliente=`+obj.cliente.id+"&prestador="+obj.prestador.id,
            obj,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }


}