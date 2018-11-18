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
import org.springframework.web.bind.annotation.RestController;

import com.appServices.AppServices.Services.CursosService;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.dto.CursosDTO;

@RestController
@RequestMapping(value="prestador/curriculo/cursos")
public class CursosResource {

	@Autowired
	private CursosService service;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Cursos> find(@PathVariable Integer id){
		Cursos objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
	}
	
	
	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public ResponseEntity<Cursos> update(@Valid @RequestBody CursosDTO objDTO, @PathVariable Integer id){
		
		Cursos obj = service.fromDTO(objDTO);
		obj.setId(id);
		
		obj = service.upadate(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<CursosDTO>> findAll(){
		List<Cursos> objList = service.findAll();
		List<CursosDTO> listDto = objList.stream().map(obj -> new CursosDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
}
