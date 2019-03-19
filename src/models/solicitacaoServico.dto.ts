import { ClienteDTO } from "./cliente.dto";
import { PrestadorDTO } from "./prestador.dto";
import { ItensSolicitacaoServicoDTO } from "./ItensSolicitacaoServico.dto";
import { OrcamentoDTO } from "./orcamento.dto";

export interface SolicitacaoServicoDTO{
    id:string;
    produtoServico:string;
    data:Date;
    itensSolicitacaoServico:ItensSolicitacaoServicoDTO[];
    profissao:string;
    cliente:ClienteDTO;
    prestador:PrestadorDTO;
    orcamento:OrcamentoDTO;
}