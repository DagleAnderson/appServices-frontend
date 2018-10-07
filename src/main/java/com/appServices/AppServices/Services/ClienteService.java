package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.repositories.ClienteRespository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRespository clienteRepository;
	
	public Cliente find(Integer id) {
		
		Optional<Cliente> objOp = clienteRepository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName())
				);
		
	}
	
	public Cliente  insert(Cliente obj){
		obj.setId(null);
		
		return clienteRepository.save(obj);
		
	}
	
	public Cliente update(Cliente obj){		
		find(obj.getId());
		return  clienteRepository.save(obj);	
	}
	
	public void delete(Integer id) {
		find(id);
		try {
		clienteRepository.deleteById(id);
		}catch(DataIntegrityException e) {
			throw new DataIntegrityException("Não é possivel excluir este cliente(chave referenciada)");
		}
	}
}

