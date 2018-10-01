package com.appServices.AppServices.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.appServices.AppServices.Services.PessoaService;
import com.appServices.AppServices.domain.Pessoa;

@RestController
@RequestMapping(value="/pessoa")
public class PesssoaResource {
	
	@Autowired
	private PessoaService pessoaService;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id){
		Pessoa objOp = pessoaService.buscar(id);
		
		return ResponseEntity.ok().body(objOp);
	}
}
