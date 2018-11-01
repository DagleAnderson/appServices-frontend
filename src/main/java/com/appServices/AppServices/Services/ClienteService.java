package com.appServices.AppServices.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.Service.exception.DataIntegrityException;
import com.appServices.AppServices.Service.exception.ObjectNotFoundException;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.EnderecoCliente;
import com.appServices.AppServices.domain.Usuario;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.dto.ClienteDTO;
import com.appServices.AppServices.dto.ClienteNewDTO;
import com.appServices.AppServices.repositories.ClienteRespository;
import com.appServices.AppServices.repositories.EnderecoClienteRespository;
import com.appServices.AppServices.repositories.UsuarioRespository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRespository repository;
	
	@Autowired
	private UsuarioRespository usuarioRepository;
	
	@Autowired
	private EnderecoClienteRespository enderecoRepository;
	
	public Cliente find(Integer id) {
		
		Optional<Cliente> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName())
				);
		
	}
	
	@Transactional
	public Cliente  insert(Cliente obj){
		obj.setId(null);
		obj = repository.save(obj);		
		usuarioRepository.save(obj.getUsuario());
		enderecoRepository.save(obj.getEndereco());
		
		return obj;
		
	}
	
	public Cliente update(Cliente obj){		
	    Cliente newObj = find(obj.getId());
		updateData(newObj,obj);
	    return  repository.save(newObj);	
	}
	
	public void delete(Integer id) {
		find(id);
		try {
			repository.deleteById(id);
		}catch(DataIntegrityException e) {
			throw new DataIntegrityException("Não é possivel excluir este cliente(chave referenciada)");
		}
	}
	
	
	public List<Cliente> findAll(){
		return repository.findAll();
	}
	
	public Page<Cliente> findPage(Integer page, Integer linesPerPage,String orderBy,String direction){
		
		PageRequest  pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		return repository.findAll(pageRequest);
	}
	
	public Cliente fromDTO(ClienteDTO objDTO) {
		
		Cliente cliente = new Cliente(objDTO.getId(),null);
		
		return cliente;
	}
	
	
	public Cliente fromNewDTO(ClienteNewDTO objDTO) {
		
		Usuario usuario = new Usuario(null,objDTO.getNome(),objDTO.getSobrenome(),objDTO.getDataNascimento(),objDTO.getRg(),objDTO.getCpfOuCnpj(),TipoPessoa.toEnum(objDTO.getTipoPessoa()),TipoSexo.toEnum(objDTO.getSexo()),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail()); 
		usuario.getTelefones().add(objDTO.getTelefone1());
		
		if(objDTO.getTelesfone2()!=null){
			usuario.getTelefones().add(objDTO.getTelesfone2());
		}	
		Cliente cliente = new Cliente(null, usuario);
		EnderecoCliente endereco = new EnderecoCliente(null,objDTO.getCidade(),objDTO.getEstado(),objDTO.getCep(),objDTO.getBairro(),objDTO.getRua(),objDTO.getNumero(),objDTO.getComplemento(), cliente);
		cliente.setEndereco(endereco);
	
		
		return cliente;
	}
	
	private void updateData(Cliente newObj, Cliente obj) {
		newObj.setId(obj.getId());
	}
}

	


