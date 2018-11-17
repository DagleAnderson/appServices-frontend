package com.appServices.AppServices.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.appServices.AppServices.domain.enums.TipoSituacao;

@Entity
public class orcamento implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="prestador_id")
	private Prestador prestador;
	
	@ManyToOne
	@JoinColumn(name="cliente_id")
	private Cliente cliente;
	
	private Double total;
	private Double desconto;
	private TipoSituacao Situacao;
	private SolicitacaoServico solicitacao;
	
	public orcamento(Integer id, Prestador prestador, Cliente cliente, Double total, Double desc,
			TipoSituacao situacao) {
		this.id = id;
		this.prestador = prestador;
		this.cliente = cliente;
		this.total = total;
		this.desconto = desc;
		this.Situacao = situacao;
	}
	
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		orcamento other = (orcamento) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Prestador getPrestador() {
		return prestador;
	}

	public void setPrestador(Prestador prestador) {
		this.prestador = prestador;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Double gettotal() {
		return total;
	}

	public void settotal(Double total) {
		this.total = total;
	}

	public Double getDesconto() {
		return desconto;
	}

	public void setDesconto(Double desc) {
		desconto = desc;
	}

	public TipoSituacao getSituacao() {
		return Situacao;
	}

	public void setSituacao(TipoSituacao situacao) {
		Situacao = situacao;
	}



	public SolicitacaoServico getSolicitacao() {
		return solicitacao;
	}



	public void setSolicitacao(SolicitacaoServico solicitacao) {
		this.solicitacao = solicitacao;
	}
	
	
	
	
}
