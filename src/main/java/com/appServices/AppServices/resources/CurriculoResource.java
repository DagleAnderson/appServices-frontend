package com.appServices.AppServices.resources;



import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appServices.AppServices.Services.CurriculoService;
import com.appServices.AppServices.Services.CursosService;
import com.appServices.AppServices.domain.Curriculo;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.dto.CursosDTO;	

@RestController
@RequestMapping("prestador/curriculo")
public class CurriculoResource {
	
	@Autowired
	private CurriculoService service;
	
	@Autowired
	private CursosService serviceCursos;
	
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Curriculo> find(@RequestParam(value="id",defaultValue="1") Integer id){
		Curriculo objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
		
	}
	
	
	//---- REST DE CURSOS APARTIR DESSE PONTO----
	
	//GET DE CURSO POR ID

}
