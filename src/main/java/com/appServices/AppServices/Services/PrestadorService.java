package com.appServices.AppServices.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.repositories.PrestadorRespository;

@Service
public class PrestadorService {
	
	@Autowired
	private PrestadorRespository prestadorRepository;
	
	public Prestador find(Integer id) {
		
		Optional<Prestador> objOp = prestadorRepository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Prestador.class.getName())
				);
	}
		
	public Prestador insert(Prestador obj){
		obj.setId(null);
		
		return  prestadorRepository.save(obj);
		
	}
	
	public Prestador update(Prestador obj){
		find(obj.getId());
		return  prestadorRepository.save(obj);
			
	}
	
	public void delete(Integer id) {
		find(id);
		try {
		prestadorRepository.deleteById(id);
		}catch(DataIntegrityException e) {
			throw new DataIntegrityException("Não é possivel excluir este prestador(chave referenciada)");
		}
	}
}

