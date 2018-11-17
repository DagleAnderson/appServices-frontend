package com.appServices.AppServices.domain.enums;

public enum TipoSituacao {
	PENDENTE(1,"PENDENTE"),
	ANALISE(2,"ANALISE"),
	APROVADO(3,"APROVADO");
	
	private Integer codigo;
	private String nome;
	
	private TipoSituacao(Integer codigo, String nome){
		this.codigo = codigo;
		this.nome = nome;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
	public  static TipoSituacao toEnum(Integer cod){
		if(cod==null) {
			return null;
		}
		for(TipoSituacao x : TipoSituacao.values()) {
			if(cod.equals(x.getCodigo())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("id inválido"+cod);	
	}
	
	
	
}


