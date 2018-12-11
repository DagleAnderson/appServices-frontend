package com.appServices.AppServices.resources;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.appServices.AppServices.Services.CursosService;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.dto.CursosDTO;
import com.appServices.AppServices.dto.CursosNewDTO;

@RestController
@RequestMapping(value="/Cursos")
public class CursosResource {
	@Autowired
	private CursosService service;
	
	@RequestMapping(value="{/id}",method = RequestMethod.GET)
	public ResponseEntity<Cursos> find(@RequestParam(value="id",defaultValue="0") Integer id){

		Cursos objList = service.find(id);
		return ResponseEntity.ok().body(objList);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> Insert(@Valid @RequestBody CursosNewDTO objDTO){
		Cursos obj = service.fromNewDTO(objDTO);
		obj = service.insert(obj);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public ResponseEntity<Cursos> update(
			@Valid @RequestBody CursosDTO objDTO, 
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id){
		
		Cursos obj = service.fromDTO(objDTO);
		obj.setId(id);
		
		obj = service.upadate(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	//GET DE TODOS OS CURSOS
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<CursosDTO>> findAll(
			@RequestParam(value="curriculo",defaultValue="0") Integer curriculo){
		List<Cursos> objList = service.findAll();
		List<CursosDTO> listDto = objList.stream().map(obj -> new CursosDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
	
}
