package com.appServices.AppServices.domain.enums;

public enum TipoPessoa {
	
	FISICA(1,"Pessoa Física"), 
	JURIDICA(2,"Pessoa Jurídica");
	
	private Integer cod;
	private String nome;

	private TipoPessoa(Integer cod, String nome){
		this.cod = cod;
		this.nome=nome;
	}

	public Integer getCod() {
		return cod;
	}


	public String getNome() {
		return nome;
	}

	
	public static TipoPessoa toEnum(Integer cod) {
		if(cod==null) {
			return null;
		}
		for(TipoPessoa x : TipoPessoa.values()) {
			if(cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("id inválido"+cod);	
	}
	
}
