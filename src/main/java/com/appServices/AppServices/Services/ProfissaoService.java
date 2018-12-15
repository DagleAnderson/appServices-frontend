package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Categoria;
import com.appServices.AppServices.domain.Profissao;
import com.appServices.AppServices.repositories.CategoriaRepository;
import com.appServices.AppServices.repositories.ProfissaoRepository;

@Service
public class ProfissaoService {
	
	@Autowired
	private ProfissaoRepository repository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public Profissao find(Integer id) {
		
		Optional<Profissao> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Profissao.class.getName())
				);
	}
	
	@Transactional
	public Profissao insert(Profissao obj) {
		obj.setId(null);
		
		obj = repository.save(obj);
	
		return  obj; 
	}
	
	public Profissao update(Profissao obj){	
		Profissao newObj = find(obj.getId());
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
	
	public List<Profissao> findAll(){
		return repository.findAll();
	}
	
	
	private void updateData(Profissao newObj,Profissao obj) {
		newObj.setId(obj.getId());
		newObj.setNome(obj.getNome());
		newObj.setCategoria(obj.getCategoria());
	}
	
	public Page<Profissao> search(Integer id,Integer page, Integer linesPerPage,String orderBy,String direction){
		
		PageRequest  pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Optional<Categoria> categorias = categoriaRepository.findById(id); 
		return repository.search(categorias,pageRequest);
	}
}
