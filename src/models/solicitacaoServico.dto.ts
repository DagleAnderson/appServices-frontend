import { ClienteDTO } from "./cliente.dto";
import { PrestadorDTO } from "./prestador.dto";
import { ItensSolicitacaoServicoDTO } from "./ItensSolicitacaoServico.dto";

export interface SolicitacaoServicoDTO{
    id:string;
    produtoServico:string;
    itensSolicitacaoServico:ItensSolicitacaoServicoDTO[];
    profissao:string;
    cliente:ClienteDTO;
    prestador:PrestadorDTO;
}