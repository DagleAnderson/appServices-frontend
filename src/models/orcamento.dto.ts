import { PrestadorDTO } from "./prestador.dto";
import { ClienteDTO } from "./cliente.dto";
import { ItensOrcamentoDTO } from "./ItensOrcamento.dto";

export interface OrcamentoDTO{
    id:string;
    produtoServico;string;
    prestador:PrestadorDTO;
    data:Date;
    cliente:ClienteDTO;
    itemOrcamento:ItensOrcamentoDTO[];
    desconto:number;
    total:number;
    situacao:string;
}