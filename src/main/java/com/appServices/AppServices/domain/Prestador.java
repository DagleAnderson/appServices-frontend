package com.appServices.AppServices.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;


@Entity
public class Prestador implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToOne
	@JoinColumn(name="pessoa_id")
	private Pessoa pessoa;
	
	@OneToMany(mappedBy = "prestador")
	private List<EnderecoPrestador> endereco =new  ArrayList<>();
	
	@OneToOne
	@JoinColumn(name="profissao_id")
	private Profissao profissao;
	

	@OneToOne(cascade=CascadeType.PERSIST,mappedBy="prestador")
	private Curriculo curriculo;

	@OneToMany(mappedBy = "prestador")
	private List<Avaliacoes> avaliacoes = new ArrayList<>();

	public Prestador() {
		
	}

	public Prestador(Integer id, Pessoa pessoa,Profissao profissao) {
		this.id = id;
		this.pessoa = pessoa;
		this.profissao= profissao;
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
		Prestador other = (Prestador) obj;
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

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public List<EnderecoPrestador> getEndereco() {
		return endereco;
	}

	public void setEndereco(List<EnderecoPrestador> endereco) {
		this.endereco = endereco;
	}

	public Profissao getProfissao() {
		return profissao;
	}

	public void setProfissao(Profissao tipoServico) {
		this.profissao= tipoServico;
	}

	public Curriculo getCurriculo() {
		return curriculo;
	}

	public void setCurriculo(Curriculo curriculo) {
		this.curriculo = curriculo;
	}

	public List<Avaliacoes> getAvaliacoes() {
		return avaliacoes;
	}

	public void setAvaliacoes(List<Avaliacoes> avaliacoes) {
		this.avaliacoes = avaliacoes;
	}
	
	

	
}
