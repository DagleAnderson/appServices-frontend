package com.appServices.AppServices.dto;

import java.sql.Date;

public class PedidoNewDTO {
	private Integer id;
	private String produtoServico;
	private Integer prestador;
	private Integer cliente;
	private String itemPedido1;
	private String itemPedido2;
	private String itemPedido3;
	private Double valorItem1;
	private Double valorItem2;
	private Double valorItem3;
	private Double desconto;
	private Double total;
	private Date data;
	private Integer situacao;
	private Integer orcamento;
	
	public PedidoNewDTO() {
		
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

	public String getItemPedido1() {
		return itemPedido1;
	}

	public void setItemPedido1(String itemPedido1) {
		this.itemPedido1 = itemPedido1;
	}

	public String getItemPedido2() {
		return itemPedido2;
	}

	public void setItemPedido2(String itemPedido2) {
		this.itemPedido2 = itemPedido2;
	}

	public String getItemPedido3() {
		return itemPedido3;
	}

	public void setItemPedido3(String itemPedido3) {
		this.itemPedido3 = itemPedido3;
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

	
	public Date getData() {
		return data;
	}


	public void setData(Date data) {
		this.data = data;
	}


	public Integer getSituacao() {
		return situacao;
	}

	public void setSituacao(Integer situacao) {
		this.situacao = situacao;
	}


	public Integer getOrcamento() {
		return orcamento;
	}


	public void setOrcamento(Integer orcamento) {
		this.orcamento = orcamento;
	}



}
