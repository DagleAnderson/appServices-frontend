package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Experiencias;
import com.appServices.AppServices.dto.ExperienciasDTO;
import com.appServices.AppServices.repositories.ExperienciasRepository;

@Service
public class ExperienciasService {

	@Autowired
	private ExperienciasRepository repository;
	
public Experiencias find(Integer id) {
		
		Optional<Experiencias> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Experiencias.class.getName())
				);
	}
	
	@Transactional
	public Experiencias insert(Experiencias obj) {
		obj.setId(null);
		
		obj = repository.save(obj);
		
		//enderecoRepository.save(obj.getEndereco());
		
		
		return  obj; 
	}
	
	public Experiencias update(Experiencias obj){	
		Experiencias newObj = find(obj.getId());
		updateData(newObj,obj);
		return  repository.save(newObj);
			
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repository.deleteById(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException( e.getMessage());
		}
	}
	
	public List<Experiencias> findAll(){
		return repository.findAll();
	}
	
	
	public Experiencias fromDTO(ExperienciasDTO objDTO) {
		
		Experiencias experiencia = new Experiencias(objDTO.getId(),objDTO.getEmpresa(),objDTO.getFuncao(),objDTO.getPeriodo(),null);
		
		return experiencia;
	}

	public void updateData(Experiencias newObj, Experiencias obj){
		newObj.setEmpresa(obj.getEmpresa());
		newObj.setFuncao(obj.getFuncao());
		newObj.setPeriodo(obj.getPeriodo());
	}

	

}
