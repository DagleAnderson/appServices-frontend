package com.appServices.AppServices.dto;

import com.appServices.AppServices.domain.Profissao;

public class ProfissaoDTO {
	
	private Integer id;
	private String nome;
	
	public ProfissaoDTO() {
		
	}
	
	public ProfissaoDTO(Profissao obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
	}

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
}
