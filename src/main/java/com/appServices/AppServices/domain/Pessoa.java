package com.appServices.AppServices.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.appServices.AppServices.domain.enums.TipoSexo;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nomeCompleto;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	private Date dataNascimento;
	private String rg;
	private String cpf;
	private Integer sexo;
	
	@ElementCollection
	@CollectionTable(name="TELEFONE")
	private Set<String> telefones =  new HashSet<>();;
	

	@OneToOne(cascade=CascadeType.ALL,mappedBy="pessoa")
	private Cliente cliente;
	
	public Pessoa() {
		
	}
	

	public Pessoa(Integer id, String nomeCompleto, Date dataNascimento, String rg, String cpf, TipoSexo sexo) {
		this.id = id;
		this.nomeCompleto = nomeCompleto;
		this.dataNascimento = dataNascimento;
		this.rg = rg;
		this.cpf = cpf;
		this.sexo = sexo.getCod();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}
	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}
	public Date getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public String getRg() {
		return rg;
	}
	public void setRg(String rg) {
		this.rg = rg;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public TipoSexo getSexo() {
		return TipoSexo.toEnum(sexo);
	}
	public void setSexo(TipoSexo sexo) {
		this.sexo =  sexo.getCod();
	}


	public Set<String> getTelefones() {
		return telefones;
	}


	public void setTelefones(Set<String> telefones) {
		this.telefones = telefones;
	}
	
	



}
