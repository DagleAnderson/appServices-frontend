package com.appServices.AppServices.dto;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.appServices.AppServices.domain.Prestador;

public class PrestadorDTO  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nome;
	private String sobrenome;
	private String profissao;
	private String cidade;
	private List<Double> avaliacao = new ArrayList<>();
	
	
	public PrestadorDTO() {
		
	}
	
	public PrestadorDTO(Prestador prestadorObj ) {
		this.id = prestadorObj.getId();
		this.nome = prestadorObj.getPessoa().getNome();
		this.sobrenome = prestadorObj.getPessoa().getSobrenome();
		this.profissao = prestadorObj.getProfissao().getNome();	
		this.cidade = prestadorObj.getEndereco().getCidade();
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
	
	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getProfissao() {
		return profissao;
	}
	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public List<Double> getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(List<Double> avaliacao) {
	
		
		
		this.avaliacao = avaliacao;
	}
	
	
	
}
