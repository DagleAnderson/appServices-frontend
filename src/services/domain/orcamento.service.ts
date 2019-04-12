import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrcamentoDTO } from "../../models/orcamento.dto";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { SituacaoDTO } from "../../models/InternalClasses/situacao.dto";

@Injectable()
export class OrcamentoService{

    constructor(public http :HttpClient){

    }
   // http://localhost:8080/orcamento?cliente=1&prestador=1&solicitacaoServico=1
    insert(obj: OrcamentoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/orcamento?cliente=`+obj.cliente.id+"&prestador="+obj.prestador.id+"&solicitacaoServico="+obj.solicitacao.id,
            obj,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }

    put(obj:OrcamentoDTO,objSituacao:SituacaoDTO){
        return this.http.put(
            `${API_CONFIG.baseUrl}/orcamento/`+obj.id,
            objSituacao,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }

    findById(orcamento_id:string):Observable<OrcamentoDTO>{
        return this.http.get<OrcamentoDTO>(`${API_CONFIG.baseUrl}/orcamento/${orcamento_id}`)    
    }

    findBySolicitacao(solicitacao_id:string):Observable<OrcamentoDTO[]>{
       return this.http.get<OrcamentoDTO[]>(`${API_CONFIG.baseUrl}/orcamento/list?solicitacaoServico=${solicitacao_id}`);     
    }
    
    findAll() : Observable<OrcamentoDTO[]>{
        return this.http.get<OrcamentoDTO[]>(`${API_CONFIG.baseUrl}/orcamento`);
    }

    delete(orcamento_id:string){
        return this.http.delete<OrcamentoDTO>(`${API_CONFIG.baseUrl}/orcamento/${orcamento_id}`) 
    }

}