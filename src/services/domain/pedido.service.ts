import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";
import { AtendimentoDTO } from "../../models/InternalClasses/atendimento.dto";

@Injectable() 
export class PedidoService{
    constructor(public http :HttpClient){
    }

    //ex: http://localhost:8080/pedido?cliente=1&prestador=1&orcamento=1
    insert(obj: PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedido?cliente=`+obj.cliente.id+"&prestador="+obj.prestador.id+"&orcamento="+obj.orcamento.id,
            obj,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }
    //ex: http://localhost:8080/pedido/1
    put(obj:PedidoDTO,objAt:AtendimentoDTO){
        return this.http.put(
            `${API_CONFIG.baseUrl}/pedido/`+obj.id,
            objAt,
            {
                observe:'response',
                responseType:'text'
            },            
        )
    }

     //ex: http://localhost:8080/pedido/1
    findById(pedido_id:string):Observable<PedidoDTO>{
        return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedido/${pedido_id}`)    
    }

     //ex: http://localhost:8080/pedido?orcamento=1&page=0&linesPerPage=10
    findByOrcamento(orcamento_id:string,page:number=0 ,linesPerPage:number=10):Observable<PedidoDTO[]>{
       return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido?orcamento=${orcamento_id}&page=${page}&linesPerPage=${linesPerPage}`);     
    }
    
     //ex: http://localhost:8080/pedido/listPedidoClient?cliente=1&page=0&linesPerPage=10
    findByClient(cliente_id,page:number=0 ,linesPerPage:number=10) : Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listPedidoClient?cliente=${cliente_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }


    //ex: http://localhost:8080/pedido/listByCliAndSituacao?cliente=1&situacao=1&situacao=1&page=0&linesPerPage=10
    findByCliAndSituacao(cliente_id:string, status:string,page:number=0 ,linesPerPage:number=10): Observable<PedidoDTO[]>{
    return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listByCliAndSituacao?cliente=${cliente_id}&situacao=${status}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    //ex: http://localhost:8080/listPedidoPrestador?prestador=1
    findByPrestador(prestador_id,page:number=0 ,linesPerPage:number=10) : Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listPedidoPrestador?prestador=${prestador_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }


      //ex: http://localhost:8080/pedido/listByPrestAndSituacao?prestador=1&situacao=1&page=0&linesPerPage=10
      findByPrestAndSituacao(profissao_id:string,status:string,page:number=0 ,linesPerPage:number=10): Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listByPrestAndSituacao?prestador=${profissao_id}&situacao=${status}&page=${page}&linesPerPage=${linesPerPage}`);
    }
}