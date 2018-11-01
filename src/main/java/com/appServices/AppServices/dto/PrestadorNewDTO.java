package com.appServices.AppServices.dto;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PrestadorNewDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String nome;
	private String sobrenome;
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	private Date dataNascimento;
	private String rg;
	private String cpfOuCnpj;
	private Integer tipoPessoa;
	private Integer sexo;
	
	@NotEmpty(message="Preenchimento Obrigatório!")
	private String login;
	
	@NotEmpty(message="Preenchimento Obrigatório!")
	private String senha;
	
	@NotEmpty(message="Preenchimento Obrigatório!")
	private String email;
	
	
	private String telefone1;
	private String telefone2;
	
	private String cidade;
	private String estado;
	private String cep;
	private String bairro;
	private String rua;
	private int numero;
	private String complemento;


	private String  nomeFantasia;	
	private String slogan;
	private String localAtendimento;
	
	private String profissao;
	private String categoria;
	

	

	public PrestadorNewDTO() {
		
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


	public Integer getTipoPessoa() {
		return tipoPessoa;
	}


	public void setTipoPessoa(Integer tipoPessoa) {
		this.tipoPessoa = tipoPessoa;
	}


	public Integer getSexo() {
		return sexo;
	}


	public void setSexo(Integer sexo) {
		this.sexo = sexo;
	}

	
	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getCidade() {
		return cidade;
	}


	public void setCidade(String cidade) {
		this.cidade = cidade;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getCep() {
		return cep;
	}


	public void setCep(String cep) {
		this.cep = cep;
	}


	public String getBairro() {
		return bairro;
	}


	public void setBairro(String bairro) {
		this.bairro = bairro;
	}


	public String getRua() {
		return rua;
	}


	public void setRua(String rua) {
		this.rua = rua;
	}


	public int getNumero() {
		return numero;
	}


	public void setNumero(int numero) {
		this.numero = numero;
	}


	public String getComplemento() {
		return complemento;
	}


	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}


	public String getNomeFantasia() {
		return nomeFantasia;
	}


	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}


	public String getSlogan() {
		return slogan;
	}


	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}


	public String getLocalAtendimento() {
		return localAtendimento;
	}


	public void setLocalAtendimento(String localAtendimento) {
		this.localAtendimento = localAtendimento;
	}


	public String getProfissao() {
		return profissao;
	}


	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}


	public String getCategoria() {
		return categoria;
	}


	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}


	public String getTelefone1() {
		return telefone1;
	}


	public void setTelefone1(String telefone1) {
		this.telefone1 = telefone1;
	}


	public String getTelefone2() {
		return telefone2;
	}


	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}
	
	
	
}
