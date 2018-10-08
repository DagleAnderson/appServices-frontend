package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.dto.PessoaDTO;
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
	
	public List<Pessoa> findAll(){
		return pessoaRepository.findAll();
	}
	
	
	public Pessoa fromDTO(PessoaDTO objDTO) {
		return new Pessoa(objDTO.getId(), objDTO.getNome(), objDTO.getSobrenome(), objDTO.getDataNascimento(), objDTO.getRg(), objDTO.getCpf(), objDTO
				.getSexo());
	}
	
}

