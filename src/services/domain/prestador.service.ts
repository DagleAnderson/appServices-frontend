import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { PrestadorDTO } from "../../models/prestador.dto";

@Injectable()
export class PrestadorService{

    constructor(public http: HttpClient){

    }

    findByProfissao(profissao_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/prestador?profissao=${profissao_id}`);
    }

    getImageFromBucket(id:string) : Observable<any>{
        let url = `${API_CONFIG.bucktBaseURL}/clientprofile/cp${id}.jpg`
        return this.http.get(url,{responseType:'blob'});
    }


    findByid(prestador_id:string):Observable<PrestadorDTO>{
        return this.http.get<PrestadorDTO>(`${API_CONFIG.baseUrl}/prestador/${prestador_id}`)    
    }

    findbyPage():Observable<PrestadorDTO[]>{
        return this.http.get<PrestadorDTO[]>(`${API_CONFIG.baseUrl}/prestador/page`)
    }

}