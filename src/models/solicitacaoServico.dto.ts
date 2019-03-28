import { ItensSolicitacaoServicoDTO } from "./ItensSolicitacaoServico.dto";
import { refDTO } from "./ref.dto";

export interface SolicitacaoServicoDTO{
    id:string;
    produtoServico:string;
    data:string;
    itemSolicitacao1:ItensSolicitacaoServicoDTO;
    itemSolicitacao2:ItensSolicitacaoServicoDTO;
    itemSolicitacao3:ItensSolicitacaoServicoDTO;
    itemSolicitacao4:ItensSolicitacaoServicoDTO;
    itemSolicitacao5:ItensSolicitacaoServicoDTO;
    itemSolicitacao6:ItensSolicitacaoServicoDTO;
    itemSolicitacao7:ItensSolicitacaoServicoDTO;
    itemSolicitacao8:ItensSolicitacaoServicoDTO;
    profissao:refDTO;
    cliente:string;
    statusSolicitacao:string;
}