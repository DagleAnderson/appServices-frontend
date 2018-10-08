package com.appServices.AppServices.dto;


import java.io.Serializable;

import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.domain.enums.TipoSexo;

public class PrestadorDTO  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nome;
	private String sobrenome;
	private Integer sexo;
	private String profissao;
	//private String cidade;
	
	public PrestadorDTO() {
		
	}
	
	public PrestadorDTO(Prestador prestadorObj ) {
		this.id = prestadorObj.getId();
		this.nome = prestadorObj.getPessoa().getNome();
		this.sobrenome = prestadorObj.getPessoa().getSobrenome();
		this.sexo = prestadorObj.getPessoa().getSexo().getCod();
		this.profissao = prestadorObj.getProfissao().getNome();
		
		
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

	public TipoSexo getSexo() {
		return TipoSexo.toEnum(sexo);
	}
	public void setSexo( TipoSexo sexo) {
		this.sexo = sexo.getCod();
	}
	public String getProfissao() {
		return profissao;
	}
	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}
	
}
