package com.appServices.AppServices.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.appServices.AppServices.Services.PrestadorService;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.dto.PrestadorDTO;
import com.appServices.AppServices.dto.PrestadorNewDTO;

@RestController
@RequestMapping(value="/prestador")
public class PrestadorResource {
	
	@Autowired
	private PrestadorService service;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Prestador> find(@PathVariable Integer id){
		
		Prestador objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> inserir(@RequestBody PrestadorNewDTO objDTO){
		Prestador obj = service.fromNewDTO(objDTO);
		obj = service.insert(obj);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
		
	}
	

	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public ResponseEntity<Void>update(@RequestBody PrestadorDTO objDTO, @PathVariable Integer id){
		Prestador obj = service.fromDTO(objDTO);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id ){
		service.find(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<PrestadorDTO>> findAll(){
		List<Prestador> objList =service.findAll();
		
		List<PrestadorDTO> listPrestador= objList.stream().map(obj -> new PrestadorDTO(obj)).collect(Collectors.toList());
		
		return ResponseEntity.ok().body(listPrestador);
	}
	
	
	@RequestMapping(value="/page",method = RequestMethod.GET)
	public ResponseEntity<Page<PrestadorDTO>> findAllPage(
			@RequestParam(value="page",defaultValue ="0") Integer page, 
			@RequestParam(value="linesPerPage",defaultValue ="24") Integer linesPerPage,
			@RequestParam(value="orderBy",defaultValue ="id")	String orderBy,
			@RequestParam(value="direction",defaultValue ="ASC") String direction
			){
		
		Page<Prestador> objList =service.findPage(page, linesPerPage,orderBy,direction);
		
		Page<PrestadorDTO> listPrestador= objList.map(obj -> new PrestadorDTO(obj));
		
		return ResponseEntity.ok().body(listPrestador);
	}
}
