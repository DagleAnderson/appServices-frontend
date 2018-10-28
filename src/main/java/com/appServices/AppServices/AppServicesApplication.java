package com.appServices.AppServices;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.appServices.AppServices.domain.Categoria;
import com.appServices.AppServices.domain.Avaliacoes;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.Curriculo;
import com.appServices.AppServices.domain.Cursos;
import com.appServices.AppServices.domain.EnderecoCliente;
import com.appServices.AppServices.domain.EnderecoPrestador;
import com.appServices.AppServices.domain.Experiencias;
import com.appServices.AppServices.domain.Usuario;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.domain.Profissao;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.repositories.CategoriaRespository;
import com.appServices.AppServices.repositories.AvaliacoesRespository;
import com.appServices.AppServices.repositories.ClienteRespository;
import com.appServices.AppServices.repositories.CurriculoRespository;
import com.appServices.AppServices.repositories.CursosRespository;
import com.appServices.AppServices.repositories.EnderecoClienteRespository;
import com.appServices.AppServices.repositories.EnderecoPrestadorRespository;
import com.appServices.AppServices.repositories.ExperienciasRespository;
import com.appServices.AppServices.repositories.PessoaRespository;
import com.appServices.AppServices.repositories.PrestadorRespository;
import com.appServices.AppServices.repositories.ProfissaoRespository;

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
	private CategoriaRespository areaPorfissionalRepository;
	
	@Autowired
	private ProfissaoRespository servicosRepository;
	
	@Autowired
	private CurriculoRespository curriculoRepository;
	
	@Autowired
	private CursosRespository cursosRespository;
	
	@Autowired
	private ExperienciasRespository experienciasRespository;
	
	@Autowired
	private AvaliacoesRespository avaliacoesRespository;
	
	
	public static void main(String[] args){
		SpringApplication.run(AppServicesApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub	
	SimpleDateFormat data = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	Usuario p1 = new Usuario(null,"Dagle"," Anderson",data.parse("22/10/1994 22:00"),"1432756311","063176845960",TipoPessoa.FISICA,TipoSexo.MASCULINO);
		p1.getTelefones().addAll(Arrays.asList("77-991049498"));
	Usuario p2 = new Usuario(null,"José ","",data.parse("05/12/1965 00:00"),"123453678","1234536789",TipoPessoa.JURIDICA,TipoSexo.MASCULINO);	
		p2.getTelefones().addAll(Arrays.asList("77-991489740"));
		
		pessoaRepository.saveAll(Arrays.asList(p1,p2));
		
		
	Cliente cli1 = new Cliente(null,p1);
	EnderecoCliente end1 = new EnderecoCliente(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio", cli1);
	cli1.setEndereco(end1);
	
			clienteRespository.saveAll(Arrays.asList(cli1));
			enderecoClienteRespository.saveAll(Arrays.asList(end1));
			
	

			
	Categoria areaProf1= new Categoria(null, "Construção e Reforma");		
	Profissao prof1 = new Profissao(null, "Pintor",areaProf1);
	Profissao prof2 = new Profissao(null, "Pedreiro",areaProf1);
	Profissao prof3 = new Profissao(null, "Engenheiro",areaProf1);
		areaProf1.getServicos().addAll(Arrays.asList(prof1,prof2,prof3));
		
		areaPorfissionalRepository.saveAll(Arrays.asList(areaProf1));
		servicosRepository.saveAll(Arrays.asList(prof1,prof2,prof3));
	
	Prestador prest1 = new Prestador(null,"Ceará Pintor","pinturas em geral","domiciliar", p2,prof1);	
	EnderecoPrestador end2 = new EnderecoPrestador(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio",prest1);
			prest1.setEndereco(end2);
			
	Curriculo c1 = new Curriculo(null, prest1);
	Cursos curso1 = new Cursos(null, "Oficina Coral", "Coral Titas Brasil","2 dias", c1);
	Cursos curso2 = new Cursos(null, "treinamento Suvenil ", "Suvenil tintas","7 dias ", c1);
	Experiencias exp1 = new Experiencias(null,"Suvinil LTDA", "Pinto","2 anos",c1);
	c1.getCursos().addAll(Arrays.asList(curso1,curso2));
	c1.getExperiencias().addAll(Arrays.asList(exp1));
	
	prest1.setCurriculo(c1);
	prestadorRepository.saveAll(Arrays.asList(prest1));
	enderecoPrestadorRepository.saveAll(Arrays.asList(end2));

	
	
	curriculoRepository.saveAll(Arrays.asList(c1));
	cursosRespository.saveAll(Arrays.asList(curso1,curso2));
	experienciasRespository.saveAll(Arrays.asList(exp1));
	
	
	Avaliacoes aval1 = new Avaliacoes(null, cli1, prest1, 5, "Um dos melhores pintores que ja contratei na vida");
	 prest1.getAvaliacoes().addAll(Arrays.asList(aval1));
	 
	 
	 
	 avaliacoesRespository.saveAll(Arrays.asList(aval1));
	 clienteRespository.saveAll(Arrays.asList(cli1));
	 prestadorRepository.saveAll(Arrays.asList(prest1));
			
			

		
	}
}
