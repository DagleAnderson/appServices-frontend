package com.appServices.AppServices.dto;

import com.appServices.AppServices.domain.Cursos;

public class CursosDTO {
	
	private Integer id;
	private String descricao;
	private String instituicao;
	private String duracao;
	
	public CursosDTO() {
		
	}
	
	public CursosDTO(Cursos cursoObj) {
		this.id = cursoObj.getId();
		this.descricao =cursoObj.getDescricao();
		this.instituicao = cursoObj.getInstituicao();
		this.duracao = cursoObj.getDuracao();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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



