import { ItensSolicitacaoServicoDTO } from "./ItensSolicitacaoServico.dto";

export interface SolicitacaoServicoDTO{
    id:string;
    produtoServico:string;
    data:string;
    itemSolicitacao1:ItensSolicitacaoServicoDTO;
    itemSolicitacao2:ItensSolicitacaoServicoDTO;
    itemSolicitacao3:ItensSolicitacaoServicoDTO;
    profissao:string;
    cliente:string;
    statusSolicitacao:string;
}