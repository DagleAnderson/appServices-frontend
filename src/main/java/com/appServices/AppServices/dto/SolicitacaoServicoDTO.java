package com.appServices.AppServices.dto;

import java.io.Serializable;

import com.appServices.AppServices.domain.SolicitacaoServico;

public class SolicitacaoServicoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	
	private Integer id;
	private String produtoServico;
	
	public SolicitacaoServicoDTO() {
		
	}
	
	public SolicitacaoServicoDTO(SolicitacaoServico objDTO) {
		this.id=objDTO.getId();
		this.produtoServico = objDTO.getProdutoServico();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProdutoServico() {
		return produtoServico;
	}

	public void setProdutoServico(String produtoServico) {
		this.produtoServico = produtoServico;
	}
	
	
}
