import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SolicitacaoServicoDTO } from "../../models/solicitacaoServico.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class SolicitacaoServicoService{

    constructor(public http :HttpClient){

    }

    insert(obj: SolicitacaoServicoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/solicitacao?cliente=`+obj.cliente+"&profissao="+obj.profissao,
            obj,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }

    
    findById(solicitacao_id:string):Observable<SolicitacaoServicoDTO>{
        return this.http.get<SolicitacaoServicoDTO>(`${API_CONFIG.baseUrl}/solicitacao/${solicitacao_id}`)    
    }
    
    findAll() : Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao`);
    }



}