package com.appServices.AppServices.dto;

import com.appServices.AppServices.domain.Experiencias;

public class ExperienciasDTO {
	
	private Integer id;
	private String empresa;
	private String funcao;
	private String periodo;
	
	public ExperienciasDTO() {
		
	}
	
	

	public ExperienciasDTO(Experiencias experienciaObj) {
		this.id = experienciaObj.getId();
		this.empresa = experienciaObj.getEmpresa();
		this.funcao = experienciaObj.getFuncao();
		this.periodo = experienciaObj.getPeriodo();
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}

	public String getFuncao() {
		return funcao;
	}

	public void setFuncao(String funcao) {
		this.funcao = funcao;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	
	

}
