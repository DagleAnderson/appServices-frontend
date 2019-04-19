import { ClienteDTO } from "./cliente.dto";
import { PrestadorDTO } from "./prestador.dto";
import { refDTO } from "./InternalClasses/ref.dto";

export interface AvaliacoesDTO{
    id:string;
    cliente:refDTO;
    prestador:refDTO;
    estrelas:number;
    comentario:string;

}