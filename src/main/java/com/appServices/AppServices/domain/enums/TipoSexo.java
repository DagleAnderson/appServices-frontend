package com.appServices.AppServices.domain.enums;

	public enum TipoSexo {
		MASCULINO(1,"MASCULINO"),
		FEMININO(2,"FEMININO");
		
		private Integer cod;
		private String nome;
		
		private TipoSexo(Integer cod, String nome){
			this.cod = cod;
			this.nome = nome;
		}

		public Integer getCod() {
			return cod;
		}
		
		public String getNome() {
			return nome;
		}

		
		public  static TipoSexo toEnum(Integer cod){
			if(cod==null) {
				return null;
			}
			for(TipoSexo x : TipoSexo.values()) {
				if(cod.equals(x.getCod())) {
					return x;
				}
			}
			
			throw new IllegalArgumentException("id inválido"+cod);	
		}

	}