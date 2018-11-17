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
import com.appServices.AppServices.domain.Categoria;
import com.appServices.AppServices.domain.EnderecoPrestador;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.domain.Profissao;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.dto.PrestadorDTO;
import com.appServices.AppServices.dto.PrestadorNewDTO;
import com.appServices.AppServices.repositories.CategoriaRepository;
import com.appServices.AppServices.repositories.ClienteRepository;
import com.appServices.AppServices.repositories.EnderecoPrestadorRepository;
import com.appServices.AppServices.repositories.PrestadorRepository;
import com.appServices.AppServices.repositories.ProfissaoRepository;

@Service
public class PrestadorService {
	
	@Autowired
	private PrestadorRepository repository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private EnderecoPrestadorRepository enderecoRepository;
	
	@Autowired
	private ProfissaoRepository profissaoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	
	public Prestador find(Integer id) {
		
		Optional<Prestador> objOp = repository.findById(id);
		
		return objOp.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Prestador.class.getName())
				);
	}
	
	@Transactional
	public Prestador insert(Prestador obj){
		obj.setId(null);
		obj = repository.save(obj);
		
		clienteRepository.save(obj.getCliente());
		enderecoRepository.save(obj.getEndereco());
		profissaoRepository.save(obj.getProfissao());
		categoriaRepository.save(obj.getProfissao().getCategoria());
		
		
		return  obj ;
		
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
	
	public Prestador fromNewDTO(PrestadorNewDTO objDTO) {
		Cliente usuario = new Cliente(null,objDTO.getNome(),objDTO.getSobrenome(),objDTO.getDataNascimento(),objDTO.getRg(),objDTO.getCpfOuCnpj(),TipoPessoa.toEnum(objDTO.getTipoPessoa()),TipoSexo.toEnum(objDTO.getSexo()),objDTO.getLogin(),objDTO.getSenha(),objDTO.getEmail()); 
		usuario.getTelefones().add(objDTO.getTelefone1());
		
		if(objDTO.getTelefone2()!=null){
			usuario.getTelefones().add(objDTO.getTelefone2());
		}
				
		Categoria categoria = new Categoria(null,objDTO.getCategoria());
		Profissao profissao = new Profissao(null,objDTO.getProfissao(),categoria);
		Prestador prestador = new Prestador(null,objDTO.getNomeFantasia(),objDTO.getSlogan(),objDTO.getLocalAtendimento(),usuario,profissao);
		EnderecoPrestador endereco = new EnderecoPrestador(null,objDTO.getCidade() ,objDTO.getEstado(),objDTO.getCep(),objDTO.getBairro(), objDTO.getRua(),objDTO.getNumero(),objDTO.getComplemento(), prestador);
		
		prestador.setEndereco(endereco);
		
		return prestador;
	}
	
	private void updateData(Prestador newObj, Prestador obj) {
	 newObj.setNomeFantasia(obj.getNomeFantasia());
	 newObj.setSlogan(obj.getSlogan());
	 newObj.setLocalAtendimento(obj.getLocalAtendimento());
	}
}

	

