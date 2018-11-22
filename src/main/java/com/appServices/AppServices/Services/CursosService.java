package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.dto.CursosDTO;
import com.appServices.AppServices.repositories.CursosRepository;

@Service
public class CursosService {
	
	@Autowired
	private CursosRepository repository;
	
	
	public Cursos find(Integer id) {
		
		Optional<Cursos> obj = repository.findById(id);
		
		return obj.orElseThrow( () -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName())	
				);
	}
	
	public Cursos upadate(Cursos obj) {
		Cursos newObj = find(obj.getId());
		updateData(newObj,obj);
		
		return repository.save(newObj);
		
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repository.deleteById(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException( e.getMessage());
		}
	}
	
	public List<Cursos> findAll(){
		return repository.findAll();
	}
	
	public Cursos fromDTO(CursosDTO objDTO) {
		
		Cursos obj = new Cursos(objDTO.getId(), objDTO.getCurso(), objDTO.getInstituicao(), objDTO.getDuracao(), null);
		
		return obj;
	}
	
	
	
	
	public void updateData(Cursos newObj, Cursos obj){
		newObj.setCurso(obj.getCurso());
		newObj.setDuracao(obj.getDuracao());
		newObj.setInstituicao(obj.getInstituicao());
	}
}
