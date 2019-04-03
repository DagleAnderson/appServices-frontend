import { PrestadorDTO } from "./prestador.dto";
import { ClienteDTO } from "./cliente.dto";
import { ItensOrcamentoDTO } from "./ItensOrcamento.dto";
import { refDTO } from "./ref.dto";
import { FormaPagamentoDTO } from "./FormaPagamento.dto";
import { SolicitacaoServicoDTO } from "./solicitacaoServico.dto";

export interface OrcamentoDTO{
    id:string;
    produtoServico:string;
    prestador:refDTO;
    data:string;
    cliente:refDTO;
    itensOrcamento:ItensOrcamentoDTO[];
    desconto:number;
    total:number;
    formaDePagamento:FormaPagamentoDTO[];
    situacao:string;
    solicitacao:refDTO;
}