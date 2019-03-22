import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrcamentoDTO } from "../../models/orcamento.dto";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrcamentoService{

    constructor(public http :HttpClient){

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

}