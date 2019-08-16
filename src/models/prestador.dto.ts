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
    telefones:string[];
    imageUrl?:string;

    curriculo:CurriculoDTO;
    portfolioImages:string[];

    mediaDeAvaliacao:number;
}