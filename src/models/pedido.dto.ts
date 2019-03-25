import { PrestadorDTO } from "./prestador.dto";
import { ItensPedidoDTO } from "./ItensPedido.dto";
import { refDTO } from "./ref.dto";

export interface PedidoDTO{
    id:string;
    produtoServico;string;
    prestador:PrestadorDTO;
    data:Date;
    cliente:refDTO;
    itemPedido:ItensPedidoDTO[];
    desconto:number;
    total:number;
    situacao:string;
}