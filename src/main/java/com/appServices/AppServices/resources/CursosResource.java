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

import com.appServices.AppServices.Services.CursosService;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.dto.CursosDTO;

@RestController
@RequestMapping(value="prestador/curriculo")
public class CursosResource {
	@Autowired
	private CursosService service;
	
	@RequestMapping(value="/{idCurriculo}/curso",method = RequestMethod.GET)
	public ResponseEntity<Cursos> findCursos(
			@PathVariable Integer idCurriculo,
			@RequestParam(value="id",defaultValue="0") Integer id){

		Cursos objList = service.find(id);
		return ResponseEntity.ok().body(objList);
	}
	
	@RequestMapping(value="/{idCurriculo}/curso",method = RequestMethod.PUT)
	public ResponseEntity<Cursos> update(
			@Valid @RequestBody CursosDTO objDTO, 
			@PathVariable Integer idCurriculo,
			@RequestParam(value="id",defaultValue="0") Integer id){
		
		Cursos obj = service.fromDTO(objDTO);
		obj.setId(id);
		
		obj = service.upadate(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	@RequestMapping(value="/{idCurriculo}/curso",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(
			@PathVariable Integer idCurriculo,
			@RequestParam(value="id",defaultValue="0") Integer id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	//GET DE TODOS OS CURSOS
	@RequestMapping(value="/{idCurriculo}/cursos",method = RequestMethod.GET)
	public ResponseEntity<List<CursosDTO>> findCursosAll(){
		List<Cursos> objList = service.findAll();
		List<CursosDTO> listDto = objList.stream().map(obj -> new CursosDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
	
}
