package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.ItensSolicitacao;
import com.appServices.AppServices.repositories.ItensSolicitacaoRepository;

public class ItensSolicitacaoService {

	@Autowired	
	private ItensSolicitacaoRepository repository;
	
public ItensSolicitacao find(Integer id) {
		
		Optional<ItensSolicitacao> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + ItensSolicitacao.class.getName())
				);
	}
	
	@Transactional
	public ItensSolicitacao insert(ItensSolicitacao obj) {
		obj.setId(null);
		
		obj = repository.save(obj);
		
		return  obj; 
	}
	
	public ItensSolicitacao update(ItensSolicitacao obj){	
		ItensSolicitacao newObj = find(obj.getId());
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
	
	public List<ItensSolicitacao> findAll(){
		return repository.findAll();
	}
	
	
	/**
	public ItensSolicitacao fromDTO(ItensSolicitacaoDTO objDTO) {
		
		ItensSolicitacao ItensSolicitacao = new ItensSolicitacao(objDTO.getId(),objDTO.getNome(),objDTO.getSobrenome(), objDTO.getDataNascimento(),objDTO.getRg(), objDTO.getcpfOuCnpj(),objDTO.getTipoPessoa(), objDTO.getSexo(),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail());
		ItensSolicitacao.getTelefones().addAll(objDTO.getTelefones());
		
		return ItensSolicitacao;
	}

	public ItensSolicitacao fromNewDTO(ItensSolicitacaoNewDTO objDTO) {
		
		ItensSolicitacao ItensSolicitacao = new ItensSolicitacao(null,objDTO.getNome(),objDTO.getSobrenome(), objDTO.getDataNascimento(),objDTO.getRg(), objDTO.getCpfOuCnpj(),TipoPessoa.toEnum(objDTO.getTipoPessoa()),TipoSexo.toEnum(objDTO.getSexo()),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail());
			
		return ItensSolicitacao;
	}
	**/
	
	private void updateData(ItensSolicitacao newObj,ItensSolicitacao obj) {
		
	}

}
