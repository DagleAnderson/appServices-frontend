import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SolicitacaoServicoDTO } from "../../models/solicitacaoServico.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { SituacaoDTO } from "../../models/InternalClasses/situacao.dto";

@Injectable()
export class SolicitacaoServicoService{

    constructor(public http :HttpClient){

    }

    insert(obj: SolicitacaoServicoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/solicitacao?cliente=`+obj.cliente.id+"&profissao="+obj.profissao,
            obj,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }

    put(obj:SolicitacaoServicoDTO,objSituacao:SituacaoDTO){
        return this.http.put(
            `${API_CONFIG.baseUrl}/solicitacao/`+obj.id,
            objSituacao,
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


    findAllByCliente(cliente_id:string): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listCliente?cliente=${cliente_id}`);
    }

    findAllByProfissao(profissao_id:string): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listProfissao?profissao=${profissao_id}`);
    }


}