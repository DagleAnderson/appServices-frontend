
import { ItensOrcamentoDTO } from "./ItensOrcamento.dto";
import { refDTO } from "./ref.dto";
import { FormaDePagamentoDTO } from "./FormaDePagamento.dto";


export interface OrcamentoDTO{
    id:string;
    produtoServico:string;
    prestador:refDTO;
    data:string;
    cliente:refDTO;
    itensOrcamento:ItensOrcamentoDTO[];
    desconto:number;
    total:number;
    formaDePagamento:FormaDePagamentoDTO[];
    situacao:string;
    solicitacao:refDTO;
}