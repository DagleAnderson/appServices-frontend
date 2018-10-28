package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.dto.PrestadorDTO;
import com.appServices.AppServices.repositories.PrestadorRespository;

@Service
public class PrestadorService {
	
	@Autowired
	private PrestadorRespository repository;
	
	public Prestador find(Integer id) {
		
		Optional<Prestador> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Prestador.class.getName())
				);
	}
		
	public Prestador insert(Prestador obj){
		obj.setId(null);
		
		return  repository.save(obj);
		
	}
	
	public Prestador update(Prestador obj){
		Prestador newObj =  find(obj.getId());
		updateData(newObj,obj);
		return  repository.save(newObj);
			
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repository.deleteById(id);
		}catch(DataIntegrityException e) {
			throw new DataIntegrityException("Não é possivel excluir este prestador(chave referenciada)");
		}
	}
	
	public List<Prestador> findAll(){
		return repository.findAll();
	}
	
	public Page<Prestador> findPage(Integer page, Integer linesPerPage,String orderBy,String direction){
		
		PageRequest  pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		return repository.findAll(pageRequest);
	}
	
	public Prestador fromDTO(PrestadorDTO objDTO) {
		
		Prestador prestador = new Prestador(objDTO.getId(),objDTO.getNomeFantasia(),objDTO.getSlogan(),objDTO.getLocalAtendimento(),null,null);
		return prestador;
	}
	
	private void updateData(Prestador newObj, Prestador obj) {
	 newObj.setNomeFantasia(obj.getNomeFantasia());
	 newObj.setSlogan(obj.getSlogan());
	 newObj.setLocalAtendimento(obj.getLocalAtendimento());
	}
}

	

