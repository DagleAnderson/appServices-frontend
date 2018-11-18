package com.appServices.AppServices.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.appServices.AppServices.Services.CurriculoService;
import com.appServices.AppServices.domain.Curriculo;

@RestController
@RequestMapping("prestador/curriculo")
public class CurriculoResource {
	
	@Autowired
	private CurriculoService service;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Curriculo> find(@PathVariable Integer id){
		Curriculo objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
		
	}
	
	
	
}
