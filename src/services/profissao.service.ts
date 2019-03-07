import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import {Observable} from "rxjs/Rx";
import { Injectable } from "@angular/core";

@Injectable()
export class ProfissaoService{

    constructor(public http: HttpClient){

    }

    findByCategoria(categoria_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/categorias/${categoria_id}/profissoes`);
    }
}