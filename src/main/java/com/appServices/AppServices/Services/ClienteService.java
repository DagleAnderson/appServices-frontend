package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.repositories.ClienteRespository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRespository clienteRepository;
	
	public Cliente buscar(Integer id) {
		
		Optional<Cliente> objOp = clienteRepository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName())
				);
		
	}
}

