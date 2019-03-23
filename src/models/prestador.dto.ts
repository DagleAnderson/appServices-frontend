import { CurriculoDTO } from "./curriculo.dto";

export interface PrestadorDTO{
    id:string;
    nomeFantasia:string;
    slogan:string;
    localAtendimento:string;
    cidade:string;
    estado:string;
	cep:string;
	bairro:string;
	rua:string;
	numero:string;
    complemento:string; 
    imageUrl?:string;

    curriculo:CurriculoDTO;

    mediaDeAvaliacao:number;
}