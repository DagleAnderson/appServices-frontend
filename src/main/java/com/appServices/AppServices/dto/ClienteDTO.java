package com.appServices.AppServices.dto;

import java.io.Serializable;

import com.appServices.AppServices.domain.Cliente;

public class ClienteDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	
	public ClienteDTO() {
		
	}

	public ClienteDTO(Cliente clienteObj) {
		this.id = clienteObj.getId();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
}

