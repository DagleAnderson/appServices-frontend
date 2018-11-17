package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Curriculo;
import com.appServices.AppServices.repositories.CurriculoRepository;

@Service
public class CurriculoService {

	@Autowired
	private CurriculoRepository repository;
	
	public Curriculo find(Integer id) {
			
		Optional<Curriculo> objOp =  repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id:" + id + ", Tipo:" + Curriculo.class.getName())
				);
	}
	
	public Curriculo insert(Curriculo obj) {
		obj.setId(null);
		
		obj = repository.save(obj);
		
		return obj;
	}
}
