import { PrestadorDTO } from "./prestador.dto";
import { ClienteDTO } from "./cliente.dto";
import { ItensPedidoDTO } from "./ItensPedido.dto";

export interface PedidoDTO{
    id:string;
    produtoServico;string;
    prestador:PrestadorDTO;
    data:Date;
    cliente:ClienteDTO;
    itemPedido:ItensPedidoDTO[];
    desconto:number;
    total:number;
    situacao:string;
}