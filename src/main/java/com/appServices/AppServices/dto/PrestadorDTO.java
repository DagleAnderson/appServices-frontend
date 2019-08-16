package com.appServices.AppServices.dto;


import java.io.Serializable;

import com.appServices.AppServices.domain.Prestador;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PrestadorDTO  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nomeFantasia;
	private String slogan;
	private String localAtendimento;
	
	@JsonIgnore
	private Integer clienteId;
	private String clienteNome;
	
	@JsonIgnore
	private Integer profissaoId;
	private String profissaoNome;
	
	
	public PrestadorDTO() {
		
	}
	
	public PrestadorDTO(Prestador prestadorObj ) {
		this.id = prestadorObj.getId();
		this.nomeFantasia = prestadorObj.getNomeFantasia();
		this.slogan =prestadorObj.getSlogan();
		this.localAtendimento = prestadorObj.getLocalAtendimento();
		this.clienteId = prestadorObj.getCliente().getId();
		this.clienteNome = prestadorObj.getCliente().getNome();
		this.profissaoId = prestadorObj.getProfissao().getId();
		this.profissaoNome = prestadorObj.getProfissao().getNome();
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	
	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getSlogan() {
		return slogan;
	}

	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}

	public String getLocalAtendimento() {
		return localAtendimento;
	}

	public void setLocalAtendimento(String localAtendimento) {
		this.localAtendimento = localAtendimento;
	}

	
	public Integer getClienteId() {
		return clienteId;
	}

	public void setClienteId(Integer clienteId) {
		this.clienteId = clienteId;
	}
	
	public String getClienteNome() {
		return clienteNome;
	}

	public void setClienteNome(String clienteNome) {
		this.clienteNome = clienteNome;
	}


	public Integer getProfissaoId() {
		return profissaoId;
	}

	public void setProfissaoId(Integer profissaoId) {
		this.profissaoId = profissaoId;
	}


	public String getProfissaoNome() {
		return profissaoNome;
	}

	public void setProfissaoNome(String profissaoNome) {
		this.profissaoNome = profissaoNome;
	}
	
	

	
		
}
