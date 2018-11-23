package com.appServices.AppServices.dto;

import java.io.Serializable;

public class CursosNewDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	private Integer id;
	private String curso;
	private String instituicao;
	private String duracao;
	
	
	public CursosNewDTO() {
		
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
