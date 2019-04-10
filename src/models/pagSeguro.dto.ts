import { refDTO } from "./InternalClasses/ref.dto";

export interface PagSeguroDTO{
    id:string;
    cliente: refDTO;
    valor:number;
    statusPagamento:number;
    URLCreatePag:string;
    sCode:string;
    nType:string;
}