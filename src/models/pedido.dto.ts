import { ItensPedidoDTO } from "./ItensPedido.dto";
import { refDTO } from "./InternalClasses/ref.dto";
import { FormaDePagamentoDTO } from "./FormaDePagamento.dto";

export interface PedidoDTO{
    id:string;
    produtoServico:string;
    prestador:refDTO;
    data:string;
    cliente:refDTO;
    itensPedido:ItensPedidoDTO[];
    desconto:number;
    total:number;
    formaDePagamento:FormaDePagamentoDTO[];
    atendimento:string;
    orcamento:refDTO;
}