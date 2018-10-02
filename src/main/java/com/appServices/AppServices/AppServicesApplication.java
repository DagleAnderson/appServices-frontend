package com.appServices.AppServices;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.appServices.AppServices.domain.AreaProfissional;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.EnderecoCliente;
import com.appServices.AppServices.domain.EnderecoPrestador;
import com.appServices.AppServices.domain.Pessoa;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.domain.Servicos;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.repositories.AreaProfissionalRespository;
import com.appServices.AppServices.repositories.ClienteRespository;
import com.appServices.AppServices.repositories.EnderecoClienteRespository;
import com.appServices.AppServices.repositories.EnderecoPrestadorRespository;
import com.appServices.AppServices.repositories.PessoaRespository;
import com.appServices.AppServices.repositories.PrestadorRespository;
import com.appServices.AppServices.repositories.ServicosRespository;

@SpringBootApplication
public class AppServicesApplication implements CommandLineRunner {
	
	@Autowired
	private PessoaRespository pessoaRepository;
	
	@Autowired
	private ClienteRespository clienteRespository;
	
	@Autowired
	private EnderecoClienteRespository enderecoClienteRespository;
	
	@Autowired
	private PrestadorRespository prestadorRepository;
	
	@Autowired
	private EnderecoPrestadorRespository enderecoPrestadorRepository;
	
	@Autowired
	private AreaProfissionalRespository areaPorfissionalRepository;
	
	@Autowired
	private ServicosRespository servicosRepository;
	
	public static void main(String[] args){
		SpringApplication.run(AppServicesApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub	
	SimpleDateFormat data = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	Pessoa p1 = new Pessoa(null,"Dagle Anderson Lima de Sousa",data.parse("22/10/1994 22:00"),"1432756311","063176845960",TipoSexo.MASCULINO);
		p1.getTelefones().addAll(Arrays.asList("77-991049498"));
	Pessoa p2 = new Pessoa(null,"José Feitosa de Sousa",data.parse("05/12/1965 00:00"),"123453678","1234536789", TipoSexo.MASCULINO);	
		p2.getTelefones().addAll(Arrays.asList("77-991489740"));
		
		pessoaRepository.saveAll(Arrays.asList(p1,p2));
		
		
	Cliente cli1 = new Cliente(null,p1);	
	EnderecoCliente end1 = new EnderecoCliente(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio", cli1);	
			cli1.getEndereco().addAll(Arrays.asList(end1));
	
			clienteRespository.saveAll(Arrays.asList(cli1));
			enderecoClienteRespository.saveAll(Arrays.asList(end1));
			
	

			
	AreaProfissional areaProf1= new AreaProfissional(null, "Construção e Reforma");		
	Servicos servico1 = new Servicos(null, "Pintor",areaProf1);
	Servicos servico2 = new Servicos(null, "Pedreiro",areaProf1);
	Servicos servico3 = new Servicos(null, "Engenheiro",areaProf1);
		areaProf1.getServicos().addAll(Arrays.asList(servico1,servico2,servico3));
		
		areaPorfissionalRepository.saveAll(Arrays.asList(areaProf1));
		servicosRepository.saveAll(Arrays.asList(servico1,servico2,servico3));
	
	Prestador prest1 = new Prestador(null, p2,servico1);	
	EnderecoPrestador end2 = new EnderecoPrestador(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio",prest1);
			prest1.getEndereco().addAll(Arrays.asList(end2));
	
			prestadorRepository.saveAll(Arrays.asList(prest1));
			enderecoPrestadorRepository.saveAll(Arrays.asList(end2));				
		

		
	}
}
