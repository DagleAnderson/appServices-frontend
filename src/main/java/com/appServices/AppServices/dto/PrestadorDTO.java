package com.appServices.AppServices.dto;


import java.io.Serializable;

import com.appServices.AppServices.domain.Prestador;

public class PrestadorDTO  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nomeFantasia;
	private String slogan;
	private String localAtendimento;
	
	public PrestadorDTO() {
		
	}
	
	public PrestadorDTO(Prestador prestadorObj ) {
		this.id = prestadorObj.getId();
		this.nomeFantasia = prestadorObj.getNomeFantasia();
		this.slogan =prestadorObj.getSlogan();
		this.localAtendimento = prestadorObj.getLocalAtendimento();
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

		
}
