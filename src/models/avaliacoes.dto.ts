import { ClienteDTO } from "./cliente.dto";
import { PrestadorDTO } from "./prestador.dto";

export interface AvaliacoesDTO{
    id:string;
    cliente:ClienteDTO;
    prestador:PrestadorDTO;
    estrelas:number;
    comentario:string;

}