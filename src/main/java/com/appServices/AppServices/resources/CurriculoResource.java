package com.appServices.AppServices.resources;




import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.appServices.AppServices.Services.CurriculoService;
import com.appServices.AppServices.Services.CursosService;
import com.appServices.AppServices.Services.ExperienciasService;
import com.appServices.AppServices.domain.Curriculo;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.domain.Experiencias;
import com.appServices.AppServices.dto.CurriculoNewDTO;
import com.appServices.AppServices.dto.CursosDTO;
import com.appServices.AppServices.dto.ExperienciasDTO;

@RestController
@RequestMapping("/prestador")
public class CurriculoResource {
	
	@Autowired
	private CurriculoService service;
	
	@Autowired
	private CursosService cursoService;
	
	@Autowired
	private ExperienciasService expeService;
	
	
	
	@RequestMapping(value="/{idPrestador}/curriculo",method = RequestMethod.GET)
	public ResponseEntity<Curriculo> find(@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="1") Integer id){
		Curriculo objOp = service.find(id);
		
		return ResponseEntity.ok().body(objOp);
		
	}
	
	@RequestMapping(value="/{idPrestador}/curriculo",method = RequestMethod.POST)
	public ResponseEntity<Curriculo> insert(@RequestBody CurriculoNewDTO objDTO){
		
		Curriculo obj = service.newFromDTO(objDTO);
		obj = service.insert(obj);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
		
	}
	
	//PUT CURSOS
	@RequestMapping(value="/{idPrestador}/curriculo/",method = RequestMethod.PUT)
	public ResponseEntity<Cursos> updateCursos(
			@Valid @RequestBody CursosDTO objDTO, 
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id,
			@RequestParam(value="id",defaultValue="0")Integer curso){
		
		Cursos obj = cursoService.fromDTO(objDTO);
		obj.setId(id);
		
		obj = cursoService.upadate(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	
	//DELETE CURSO
	@RequestMapping(value="/{idPrestador}/curriculo/",method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteCurso(
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id,
			@RequestParam(value="id",defaultValue="0")Integer curso){
		cursoService.delete(id);
		
		return ResponseEntity.noContent().build();
	}
	
	//PUT EXPERIENCIA
	@RequestMapping(value="/{idPrestador}/curriculo/",method = RequestMethod.PUT)
	public ResponseEntity<Experiencias> updateExperiencia(
			@Valid @RequestBody ExperienciasDTO objDTO, 
			@PathVariable Integer idPrestador,
			@RequestParam(value="id",defaultValue="0") Integer id,
			@RequestParam(value="id",defaultValue="0")Integer experiencia){
		
		Experiencias obj = expeService.fromDTO(objDTO);
		obj.setId(id);
		
		obj = expeService.update(obj);
		
		return ResponseEntity.noContent().build();			
	}
	
	
	//DELETE  EXPERIENCIA
	@RequestMapping(value="/{idPrestador}/curriculo/",method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteExperiencia(
			@PathVariable Integer idPrestador,
			@PathVariable Integer idCurriculo,
			@RequestParam(value="id",defaultValue="0") Integer id){
		expeService.delete(id);
		
		return ResponseEntity.noContent().build();
	}

	
}
