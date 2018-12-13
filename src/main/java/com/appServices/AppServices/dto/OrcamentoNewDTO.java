package com.appServices.AppServices.dto;

public class OrcamentoNewDTO {
	private Integer id;
	private String produtoServico;
	private Integer prestador;
	private Integer cliente;
	private String itemOrcamento1;
	private String itemOrcamento2;
	private String itemOrcamento3;
	private Double valorItem1;
	private Double valorItem2;
	private Double valorItem3;
	private Double desconto;
	private Double total;
	private Integer situacao;
	private Integer solicitacaoServico;
	
	public OrcamentoNewDTO() {
		
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

	public Integer getPrestador() {
		return prestador;
	}

	public void setPrestador(Integer prestador) {
		this.prestador = prestador;
	}

	public Integer getCliente() {
		return cliente;
	}

	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}

	public String getItemOrcamento1() {
		return itemOrcamento1;
	}

	public void setItemOrcamento1(String itemOrcamento1) {
		this.itemOrcamento1 = itemOrcamento1;
	}

	public String getItemOrcamento2() {
		return itemOrcamento2;
	}

	public void setItemOrcamento2(String itemOrcamento2) {
		this.itemOrcamento2 = itemOrcamento2;
	}

	public String getItemOrcamento3() {
		return itemOrcamento3;
	}

	public void setItemOrcamento3(String itemOrcamento3) {
		this.itemOrcamento3 = itemOrcamento3;
	}
	
	public Double getValorItem1() {
		return valorItem1;
	}

	public void setValorItem1(Double valorItem1) {
		this.valorItem1 = valorItem1;
	}

	public Double getValorItem2() {
		return valorItem2;
	}

	public void setValorItem2(Double valorItem2) {
		this.valorItem2 = valorItem2;
	}

	public Double getValorItem3() {
		return valorItem3;
	}

	public void setValorItem3(Double valorItem3) {
		this.valorItem3 = valorItem3;
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

	public Integer getSituacao() {
		return situacao;
	}

	public void setSituacao(Integer situacao) {
		this.situacao = situacao;
	}


	public Integer getSolicitacaoServico() {
		return solicitacaoServico;
	}


	public void setSolicitacaoServico(Integer solicitacaoServico) {
		this.solicitacaoServico = solicitacaoServico;
	}
	
	
	
}
