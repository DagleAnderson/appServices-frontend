package com.appServices.AppServices.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.fasterxml.jackson.annotation.JsonFormat;

public class PessoaDTO  implements Serializable {
	private static final long serialVersionUID = 1L;

		private Integer id;
		
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=5 , max=15,message=" O tamanho deve ser entre 5 e 15 caracteres")
		private String nome;
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=5 , max=20,message=" O tamanho deve ser entre 5 e 15 caracteres")
		private String sobrenome;
		@JsonFormat(pattern="dd/MM/yyyy HH:mm")
		private Date dataNascimento;
	
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=11 , max=10,message=" Seu RG deve conter no mínimo 10 caracteres")
		private String rg;
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=11 , max=11,message=" Seu CPF deve conter no mínimo 11 caracteres")
		private String cpf;
		private Integer sexo;
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=5 , max=15,message=" O tamanho deve ser entre 5 e 15 caracteres")
		private Set<String> telefones =  new HashSet<>();
		
		public PessoaDTO() {
			
		}
		

		public PessoaDTO(Pessoa pessoaObj){
			this.id = pessoaObj.getId();
			this.nome = pessoaObj.getNome();
			this.sobrenome = pessoaObj.getSobrenome();
			this.dataNascimento =(Date) pessoaObj.getDataNascimento();
			this.rg = pessoaObj.getRg();
			this.cpf = pessoaObj.getCpf();
			this.sexo = pessoaObj.getSexo().getCod();
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
