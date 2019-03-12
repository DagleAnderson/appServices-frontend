import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import {Observable} from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ProfissaoDTO } from "../../models/profissao.dto";

@Injectable()
export class ProfissaoService{

    constructor(public http: HttpClient){

    }

    findByCategoria(categoria_id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/categorias/${categoria_id}/profissoes`);
    }

    findAll():Observable<ProfissaoDTO[]>{
        return this.http.get<ProfissaoDTO[]>(`${API_CONFIG.baseUrl}/profissao`);
    }

    findById(profissao_id:string):Observable<ProfissaoDTO>{
        return this.http.get<ProfissaoDTO>(`${API_CONFIG.baseUrl}/${profissao_id}`)
    }
}