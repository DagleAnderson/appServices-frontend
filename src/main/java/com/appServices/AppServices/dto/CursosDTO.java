package com.appServices.AppServices.dto;

import com.appServices.AppServices.domain.Cursos;

public class CursosDTO {
	
	private Integer id;
	private String curso;
	private String instituicao;
	private String duracao;
	
	public CursosDTO() {
		
	}
	
	public CursosDTO(Cursos cursoObj) {
		this.id = cursoObj.getId();
		this.curso =cursoObj.getCurso();
		this.instituicao = cursoObj.getInstituicao();
		this.duracao = cursoObj.getDuracao();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCurso() {
		return curso;
	}

	public void setCurso(String curso) {
		this.curso = curso;
	}

	public String getInstituicao() {
		return instituicao;
	}

	public void setInstituicao(String instituicao) {
		this.instituicao = instituicao;
	}

	public String getDuracao() {
		return duracao;
	}

	public void setDuracao(String duracao) {
		this.duracao = duracao;
	}
	
	
	
	
}



