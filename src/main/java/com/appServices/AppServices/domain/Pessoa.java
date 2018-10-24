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

import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nome;
	private String sobrenome;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	private Date dataNascimento;
	private String rg;
	private String cpfOuCnpj;
	private Integer tipoPessoa;
	private Integer sexo;
	

	@ElementCollection
	@CollectionTable(name="TELEFONE")
	private Set<String> telefones =  new HashSet<>();
	
	
	@OneToOne(cascade=CascadeType.ALL,mappedBy="pessoa")
	private Cliente cliente;
	
	@OneToOne(cascade=CascadeType.ALL,mappedBy="pessoa")
	private Prestador prestador;
	
	
	public Pessoa() {
		
	}
	

	public Pessoa(Integer id, String nome,String sobrenome, Date dataNascimento, String rg,String CpfOuCnpj, TipoPessoa tipoPessoa, TipoSexo sexo) {
		this.id = id;
		this.nome = nome;
		this.sobrenome=sobrenome;
		this.dataNascimento = dataNascimento;
		this.rg = rg;
		this.cpfOuCnpj=CpfOuCnpj;
		this.tipoPessoa =tipoPessoa.getCod();
		this.sexo = sexo.getCod();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getSobrenome() {
		return sobrenome;
	}


	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
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
	
	public String getCpfOuCnpj() {
		return cpfOuCnpj;
	}


	public void setCpfOuCnpj(String cpfOuCnpj) {
		this.cpfOuCnpj = cpfOuCnpj;
	}


	public TipoPessoa getTipoPessoa() {
		return TipoPessoa.toEnum(tipoPessoa);
	}
	public void setTipoPessoa(TipoPessoa tipoPessoa) {
		this.tipoPessoa = tipoPessoa.getCod();
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
