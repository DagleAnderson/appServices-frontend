package com.appServices.AppServices.dto;

import com.appServices.AppServices.domain.Orcamento;
import com.appServices.AppServices.domain.enums.TipoSituacao;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class OrcamentoDTO {
	private Integer id;
	private String produtoServico;
	
	@JsonIgnore
	private Integer prestadorId;
	
	private String prestadorNome;
	
	@JsonIgnore
	private Integer cliente;
	
	private Double desconto;
	private Double total;
	private Integer situacao;
	
	
	public OrcamentoDTO() {
		
	}
	
	public OrcamentoDTO(Orcamento obj) {
		this.id = obj.getId();
		this.produtoServico = obj.getProdutoServico();
		this.prestadorId = obj.getPrestador().getId();
		this.prestadorNome = obj.getPrestador().getNomeFantasia();
		this.cliente = obj.getCliente().getId();
		this.desconto = obj.getDesconto();
		this.total  = obj.getTotal();
		this.situacao = obj.getSituacao().getCodigo();
		
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

	public Integer getPrestadorId() {
		return prestadorId;
	}

	public void setPrestadorId(Integer prestadorId) {
		this.prestadorId = prestadorId;
	}

	
	public String getPrestadorNome() {
		return prestadorNome;
	}

	public void setPrestadorNome(String prestadorNome) {
		this.prestadorNome = prestadorNome;
	}

	public Integer getCliente() {
		return cliente;
	}

	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}

	public Double getDesconto() {
		return desconto;
	}

	public void setDesconto(Double desconto) {
		this.desconto = desconto;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public TipoSituacao getSituacao() {
		return TipoSituacao.toEnum(situacao);
	}

	public void setSituacao(TipoSituacao situacao) {
		this.situacao = situacao.getCodigo();
	}


}
