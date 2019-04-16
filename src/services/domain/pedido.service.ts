import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

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

    put(obj:PedidoDTO){
        return this.http.put(
            `${API_CONFIG.baseUrl}/pedido/`+obj.id,
            obj,
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
    
    findAll() : Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedido`);
    }
}