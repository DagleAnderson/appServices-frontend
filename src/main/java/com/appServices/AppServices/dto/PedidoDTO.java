package com.appServices.AppServices.dto;

import java.io.Serializable;
import java.util.Date;

import com.appServices.AppServices.domain.Pedido;
import com.appServices.AppServices.domain.enums.StatusPagamento;
import com.appServices.AppServices.domain.enums.TipoSituacao;

public class PedidoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String produtoServico;
	private String prestador;
	private Double desconto;
	private Double total;
	private Date data;
	private Integer situacao;
	private Integer statusPagamento;
	
	public PedidoDTO() {
		
	}
	
	public PedidoDTO(Pedido obj) {
		this.id = obj.getId();
		this.produtoServico = obj.getProdutoServico();
		this.prestador = obj.getPrestador().getNomeFantasia();
		this.desconto = obj.getDesconto();
		this.total = obj.getTotal();
		this.data = obj.getData();
		this.situacao = obj.getSituacao().getCodigo();
		this.statusPagamento = obj.getStatusPagamento().getCod();
		
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

	public String getPrestador() {
		return prestador;
	}

	public void setPrestador(String prestador) {
		this.prestador = prestador;
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

	public TipoSituacao getSituacao() {
		return TipoSituacao.toEnum(situacao);
	}

	public void setSituacao(TipoSituacao situacao) {
		this.situacao = situacao.getCodigo();
	}
	
	public StatusPagamento getStatusPagamento() {
		return StatusPagamento.toEnum(statusPagamento);
	}

	public void setStatusPagamento(StatusPagamento status) {
		this.statusPagamento = status.getCod();
	}

	
	
}
