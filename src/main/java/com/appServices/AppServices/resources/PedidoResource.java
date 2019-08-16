package com.appServices.AppServices.resources;

import java.io.Serializable;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.appServices.AppServices.Services.ClienteService;
import com.appServices.AppServices.Services.OrcamentoService;
import com.appServices.AppServices.Services.PedidoService;
import com.appServices.AppServices.Services.PrestadorService;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.Orcamento;
import com.appServices.AppServices.domain.Pedido;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.dto.PedidoDTO;
import com.appServices.AppServices.dto.PedidoNewDTO;

@RestController
@RequestMapping("/pedidos")
public class PedidoResource implements Serializable {
	private static final long serialVersionUID = 1L;

	@Autowired
	private PedidoService service;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private PrestadorService prestadorService;
	
	@Autowired
	private OrcamentoService orcamentoService;
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public ResponseEntity<Pedido> find(@PathVariable Integer id){
		Pedido objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
	}
	
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> Insert(
			@Valid @RequestBody PedidoNewDTO objDTO,
			@RequestParam(value="cliente",defaultValue="0") Integer cliente,
			@RequestParam(value="prestador",defaultValue="0") Integer prestador,
			@RequestParam(value="orcamento",defaultValue="0") Integer orcamento){
		
		Cliente cli = clienteService.find(cliente);
		
		Prestador prest = prestadorService.find(prestador) ;
		
		Orcamento orcam = orcamentoService.find(orcamento); 
		
		Pedido obj = service.fromNewDTO(objDTO, cli, prest,orcam);
		
		obj = service.insert(obj);
		
		
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	
	@RequestMapping(value= "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(
			@Valid @RequestBody PedidoDTO objDTO,@PathVariable Integer id,
			@RequestParam(value="cliente",defaultValue="0") Integer cliente,
			@RequestParam(value="prestador",defaultValue="0") Integer prestador,
			@RequestParam(value="orcamento",defaultValue="0") Integer orcamento){
		
		Cliente cli = clienteService.find(cliente);
		Prestador prest = prestadorService.find(prestador);
		Orcamento orcam = orcamentoService.find(orcamento); 

		Pedido obj = service.fromDTO(objDTO, cli, prest,orcam);
		obj.setId(id);
		obj = service.update(obj);
		
		return ResponseEntity.noContent().build();
		
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		service.delete(id);
		
		return ResponseEntity.noContent().build();	
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<PedidoDTO>> findAll(){
		List<Pedido> objList =service.findAll();
		List<PedidoDTO> listDto = objList.stream().map(obj -> new PedidoDTO(obj)).collect(Collectors.toList());
		
		return ResponseEntity.ok().body(listDto);
	}

}
