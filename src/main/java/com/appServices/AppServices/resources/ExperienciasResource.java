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

import com.appServices.AppServices.Services.ExperienciasService;
import com.appServices.AppServices.domain.Experiencias;
import com.appServices.AppServices.dto.ExperienciasDTO;


@RestController
@RequestMapping(value="/experiencias")
public class ExperienciasResource {

	@Autowired
	private ExperienciasService service;
	
	@RequestMapping(value="{id}",method = RequestMethod.GET)
	public ResponseEntity<Experiencias> find(
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id){

		Experiencias objList = service.find(id);
		return ResponseEntity.ok().body(objList);
	}
	
	

	@RequestMapping(value="{id}",method = RequestMethod.PUT)
	public ResponseEntity<Experiencias> update(@Valid @RequestBody ExperienciasDTO objDTO,@PathVariable Integer id){
		Experiencias obj = service.fromDTO(objDTO);
		obj.setId(id);
		
		obj = service.update(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	//GET DE TODOS OS CURSOS
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<List<ExperienciasDTO>> findAll(){
		List<Experiencias> objList = service.findAll();
		List<ExperienciasDTO> listDto = objList.stream().map(obj -> new ExperienciasDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}
	
}
