package com.appServices.AppServices;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.EnderecoCliente;
import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.repositories.ClienteRespository;
import com.appServices.AppServices.repositories.EnderecoClienteRespository;
import com.appServices.AppServices.repositories.PessoaRespository;

@SpringBootApplication
public class AppServicesApplication implements CommandLineRunner {
	
	@Autowired
	private PessoaRespository pessoaRepository;
	
	@Autowired
	private ClienteRespository clienteRespository;
	
	@Autowired
	private EnderecoClienteRespository enderecoClienteRespository;
	
	public static void main(String[] args){
		SpringApplication.run(AppServicesApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub	
	SimpleDateFormat data = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	Pessoa p1 = new Pessoa(null,"Dagle Anderson Lima de Sousa",data.parse("22/10/1994 22:00"),"1432756311","063176845960",TipoSexo.MASCULINO);
		p1.getTelefones().addAll(Arrays.asList("77-991049498"));
		pessoaRepository.saveAll(Arrays.asList(p1));
		
		
	Cliente cli1 = new Cliente(null,p1);
	clienteRespository.saveAll(Arrays.asList(cli1));	
	
	EnderecoCliente end1 = new EnderecoCliente(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio", cli1);	
			cli1.getEndereco().addAll(Arrays.asList(end1));
			
		enderecoClienteRespository.saveAll(Arrays.asList(end1));		
		
	
	}
}
