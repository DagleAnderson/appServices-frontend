package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.repositories.PessoaRespository;

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRespository pessoaRepository;
	
	public Pessoa find(Integer id) {
		
		Optional<Pessoa> objOp = pessoaRepository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Pessoa.class.getName())
				);
	}
	
	public Pessoa insert(Pessoa obj) {
		obj.setId(null);
		
		return  pessoaRepository.save(obj);
	}
	
	public Pessoa update(Pessoa obj){	
		find(obj.getId());
		return  pessoaRepository.save(obj);
			
	}
	
	public void delete(Integer id) {
		find(id);
		try {
		pessoaRepository.deleteById(id);
		}catch(DataIntegrityException e) {
			throw new DataIntegrityException("Não é possivel excluir esta Pessoa(chave referenciada)");
		}
	}
}

