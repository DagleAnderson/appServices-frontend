import { PrestadorDTO } from "./prestador.dto";
import { CursosDTO } from "./cursos.dto";
import { ExperienciasDTO } from "./experiencias.dto";

export interface CurriculoDTO{
    id : string;
    prestador:PrestadorDTO;
    cursos?:CursosDTO[];
    experiencias?:ExperienciasDTO[];
}