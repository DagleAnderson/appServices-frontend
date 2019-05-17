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


    findById(pedido_id:string):Observable<PedidoDTO>{
        return this.http.get<PedidoDTO>(`${API_CONFIG.baseUrl}/pedido/${pedido_id}`)    
    }

    findByOrcamento(orcamento_id:string):Observable<PedidoDTO[]>{
       return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido?orcamento=${orcamento_id}`);     
    }
    
    findByClient(cliente_id) : Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listPedidoClient?cliente=${cliente_id}`);
    }

    findByPrestador(prestador_id) : Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido/listPedidoPrestador?prestador=${prestador_id}`);
    }
}