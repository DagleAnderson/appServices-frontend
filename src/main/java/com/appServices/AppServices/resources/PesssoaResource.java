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

import com.appServices.AppServices.Services.PessoaService;
import com.appServices.AppServices.domain.Pessoa;

@RestController
@RequestMapping(value="/pessoa")
public class PesssoaResource {
	
	@Autowired
	private PessoaService pessoaService;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Pessoa> find(@PathVariable Integer id){
		Pessoa objOp = pessoaService.find(id);
		
		return ResponseEntity.ok().body(objOp);
	}
	
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> Insert(@RequestBody Pessoa obj){
		obj = pessoaService.insert(obj);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	
	@RequestMapping(value= "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody Pessoa obj,@PathVariable Integer id){
		obj.setId(id);
		
		obj = pessoaService.update(obj);
		
		return ResponseEntity.noContent().build();
		
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		pessoaService.delete(id);
		
		return ResponseEntity.noContent().build();	
	}
}
