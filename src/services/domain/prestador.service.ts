import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class PrestadorService{

    constructor(public http: HttpClient){

    }

    findByPrestador(profissao_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/prestador?profissao=${profissao_id}`);
    }
}