package com.appServices.AppServices.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.appServices.AppServices.Services.CategoriaService;
import com.appServices.AppServices.domain.Categoria;
import com.appServices.AppServices.dto.CategoriaDTO;

@RestController
@RequestMapping("/categorias")
public class CategoriaResource {

	@Autowired
	private CategoriaService service;

	//GET DE TODOS AS CATEGORIAS
		@RequestMapping(method = RequestMethod.GET)
		public ResponseEntity<List<CategoriaDTO>> findAll(){
			List<Categoria> objList = service.findAll();
			List<CategoriaDTO> listDto = objList.stream().map(obj -> new CategoriaDTO(obj)).collect(Collectors.toList());
			return ResponseEntity.ok().body(listDto);
		}
}

