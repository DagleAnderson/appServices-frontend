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

    //ex: http://localhost:8080//solicitacao?cliente=1&profissao=1
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

    //ex: http://localhost:8080/solicitacao/1
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
    //ex: http://localhost:8080/solicitacao/1
    findById(solicitacao_id:string):Observable<SolicitacaoServicoDTO>{
        return this.http.get<SolicitacaoServicoDTO>(`${API_CONFIG.baseUrl}/solicitacao/${solicitacao_id}`)    
    }
    
    //ex: http://localhost:8080/solicitacao/
    findAll() : Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao`);
    }

    //ex: http://localhost:8080/solicitacao/listByCliente?cliente=1&page=0&linesPerPage=10
    findAllByCliente(cliente_id:string,page:number=0, linesPerPage:number=10): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listByCliente?cliente=${cliente_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    //ex: http://localhost:8080/solicitacao/listCliBySituacao?cliente=1&situacao=1&page=0&linesPerPage=10
    findByCliAndSituacao(cliente_id:string, status:string,page:number=0, linesPerPage:number=10): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listByCliAndSituacao?cliente=${cliente_id}&situacao=${status}&page=${page}&linesPerPage=${linesPerPage}`);
    }


    //ex: http://localhost:8080/solicitacao/listByProfissao?profissao=1&page=0&linesPerPage=10
    findAllByProfissao(profissao_id:string,page:number=0, linesPerPage:number=10): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listByProfissao?profissao=${profissao_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

      //ex: http://localhost:8080/solicitacao/listByProAndSituacao?profissao=1&situacao=1&page=0&linesPerPage=10
      findByProAndSituacao(profissao_id:string,status:string,page:number=0, linesPerPage:number=10): Observable<SolicitacaoServicoDTO[]>{
        return this.http.get<SolicitacaoServicoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao/listByProAndSituacao?profissao=${profissao_id}&situacao=${status}`);
    }
}