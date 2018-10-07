package com.appServices.AppServices.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.appServices.AppServices.Services.PrestadorService;
import com.appServices.AppServices.domain.Prestador;

@RestController
@RequestMapping(value="/prestador")
public class PrestadorResource {
	
	@Autowired
	private PrestadorService prestadorService;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Prestador> find(@PathVariable Integer id){
		Prestador objOp = prestadorService.find(id);
		
		return ResponseEntity.ok().body(objOp);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> inserir(@RequestBody Prestador obj){
		obj = prestadorService.insert(obj);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
		
	}
	

	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public ResponseEntity<Void>update(@RequestBody Prestador obj, @PathVariable Integer id){
		obj.setId(id);
		obj = prestadorService.update(obj);
		return ResponseEntity.noContent().build();
	
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id ){
		prestadorService.find(id);
		
		return ResponseEntity.noContent().build();
	}
}
