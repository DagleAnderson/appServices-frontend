import { ItensSolicitacaoServicoDTO } from "./ItensSolicitacaoServico.dto";
import { refDTO } from "./InternalClasses/ref.dto";
import { ClienteDTO } from "./cliente.dto";
import { ProfissaoDTO } from "./profissao.dto";
import { OrcamentoDTO } from "./orcamento.dto";

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
    profissao:ProfissaoDTO;
    cliente:refDTO;
    statusSolicitacao:string;
}