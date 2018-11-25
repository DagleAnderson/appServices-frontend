package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Profissao;
import com.appServices.AppServices.repositories.ProfissaoRepository;

@Service
public class ProfissaoService {
	
	@Autowired
	private ProfissaoRepository repository;
	
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
	
	
	// MÉTODOS PARA IMPLEMENTAÇÃO FUTURA -- 25/11/2018 -- BY:D'AGLÊ ANDERSON LIMA DE SOUSA
	
	/**public Profissao fromDTO(ProfissaoDTO objDTO) {
		
		Profissao Profissao = new Profissao(objDTO.getId(),objDTO.getNome(),objDTO.getSobrenome(), objDTO.getDataNascimento(),objDTO.getRg(), objDTO.getcpfOuCnpj(),objDTO.getTipoPessoa(), objDTO.getSexo(),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail());
		
		return Profissao;
	}

	public Profissao fromNewDTO(ProfissaoNewDTO objDTO) {
		
		Profissao Profissao = new Profissao(null,objDTO.getNome(),objDTO.getSobrenome(), objDTO.getDataNascimento(),objDTO.getRg(), objDTO.getCpfOuCnpj(),TipoPessoa.toEnum(objDTO.getTipoPessoa()),TipoSexo.toEnum(objDTO.getSexo()),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail());
		
		return Profissao;
	} **/
	
	private void updateData(Profissao newObj,Profissao obj) {
		newObj.setId(obj.getId());
		newObj.setNome(obj.getNome());
		newObj.setCategoria(obj.getCategoria());
	}
}
