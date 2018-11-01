package com.appServices.AppServices.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.appServices.AppServices.domain.Usuario;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.fasterxml.jackson.annotation.JsonFormat;

public class UsuarioDTO  implements Serializable {
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
		@Length(min=10 , max=10,message=" Seu RG deve conter no mínimo 10 caracteres")
		private String rg;
		@NotEmpty(message="Preenchimento Obrigatório!")
		@Length(min=11 , max=11,message=" Seu CPF deve conter no mínimo 11 caracteres")
		private String cpfOuCnpj;
		
		private Integer tipoPessoa;

		private Integer sexo;
		@NotEmpty(message="Preenchimento Obrigatório!")
		private Set<String> telefones =  new HashSet<>();
		
		@NotEmpty(message="Preenchimento Obrigatório!")
		private String login;
		
		@NotEmpty(message="Preenchimento Obrigatório!")
		private String senha;
		
		@NotEmpty(message="Preenchimento Obrigatório!")
		private String email;
		
		
		public UsuarioDTO() {
			
		}
		
		public UsuarioDTO(Usuario usuarioObj){
			this.id = usuarioObj.getId();
			this.nome = usuarioObj.getNome();
			this.sobrenome = usuarioObj.getSobrenome();
			this.dataNascimento =usuarioObj.getDataNascimento();
			this.rg = usuarioObj.getRg();
			this.cpfOuCnpj = usuarioObj.getCpfOuCnpj();
			this.tipoPessoa = usuarioObj.getTipoPessoa().getCod();
			this.sexo = usuarioObj.getSexo().getCod();
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
		public String getcpfOuCnpj() {
			return cpfOuCnpj;
		}
		public void setcpfOuCnpj(String cpf) {
			this.cpfOuCnpj= cpf;
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
		
		

}
