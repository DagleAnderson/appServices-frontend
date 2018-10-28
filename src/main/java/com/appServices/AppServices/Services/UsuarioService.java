package com.appServices.AppServices.Services;


import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Usuario;
import com.appServices.AppServices.dto.UsuarioDTO;
import com.appServices.AppServices.repositories.PessoaRespository;

@Service
public class UsuarioService {
	
	@Autowired
	private PessoaRespository repository;
	
	public Usuario find(Integer id) {
		
		Optional<Usuario> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Usuario.class.getName())
				);
	}
	
	public Usuario insert(Usuario obj) {
		obj.setId(null);
		
		return  repository.save(obj);
	}
	
	public Usuario update(Usuario obj){	
		Usuario newObj = find(obj.getId());
		updateData(newObj,obj);
		return  repository.save(newObj);
			
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repository.deleteById(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possivel excluir este usuário(chave referenciada)");
		}
	}
	
	public List<Usuario> findAll(){
		return repository.findAll();
	}
	
	
	public Usuario fromDTO(UsuarioDTO objDTO) {
		
		Usuario pessoa = new Usuario(objDTO.getId(),objDTO.getNome(),objDTO.getSobrenome(), objDTO.getDataNascimento(),objDTO.getRg(), objDTO.getcpfOuCnpj(),objDTO.getTipoPessoa(), objDTO.getSexo());
		pessoa.getTelefones().addAll(objDTO.getTelefones());
		
		return pessoa;
	}
	
	private void updateData(Usuario newObj,Usuario obj) {
		newObj.setNome(obj.getNome());
		newObj.setSobrenome(obj.getSobrenome());
		newObj.setDataNascimento(obj.getDataNascimento());
		newObj.setRg(obj.getRg());
		newObj.setCpfOuCnpj(obj.getCpfOuCnpj());
		newObj.setSexo(obj.getSexo());
		newObj.setTipoPessoa(obj.getTipoPessoa());
	} 
	
}

