package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.repositories.PessoaRespository;

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRespository pessoaRepository;
	
	public Pessoa buscar(Integer id) {
		
		Optional<Pessoa> objOp = pessoaRepository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Pessoa.class.getName())
				);
	}
	
	public Pessoa insert(Pessoa obj) {
		obj.setId(null);
		
		return  pessoaRepository.save(obj);
	}
}

