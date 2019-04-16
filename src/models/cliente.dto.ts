
import { EnderecoDTO } from "./endereco";

export interface ClienteDTO{
    id:string;
    nome:string;
    sobrenome:string;
    data_nascimento:Date;
    email:string;
    imageUrl? :string;
    endereco : EnderecoDTO;
    telefones:string[];
} 