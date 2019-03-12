import { ClienteDTO } from "./cliente.dto";
import { PrestadorDTO } from "./prestador.dto";

export interface SolicitacaoServicoDTO{
    id:string;
    produtoServico:string;
    cliente:ClienteDTO;
    prestador:PrestadorDTO;
}