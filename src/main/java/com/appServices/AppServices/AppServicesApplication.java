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
import com.appServices.AppServices.domain.ItensSolicitacao;
import com.appServices.AppServices.domain.Prestador;
import com.appServices.AppServices.domain.Profissao;
import com.appServices.AppServices.domain.SolicitacaoServico;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.domain.enums.TipoSexo;
import com.appServices.AppServices.repositories.CategoriaRepository;
import com.appServices.AppServices.repositories.AvaliacoesRepository;
import com.appServices.AppServices.repositories.ClienteRepository;
import com.appServices.AppServices.repositories.CurriculoRepository;
import com.appServices.AppServices.repositories.CursosRepository;
import com.appServices.AppServices.repositories.EnderecoClienteRepository;
import com.appServices.AppServices.repositories.EnderecoPrestadorRepository;
import com.appServices.AppServices.repositories.ExperienciasRepository;
import com.appServices.AppServices.repositories.ItensSolicitacaoRepository;
import com.appServices.AppServices.repositories.PrestadorRepository;
import com.appServices.AppServices.repositories.ProfissaoRepository;
import com.appServices.AppServices.repositories.SolicitacaoServicoRepository;

@SpringBootApplication
public class AppServicesApplication implements CommandLineRunner {
	
	@Autowired
	private ClienteRepository clienteRespository;
	
	@Autowired
	private EnderecoClienteRepository enderecoClienteRespository;
	
	@Autowired
	private PrestadorRepository prestadorRepository;
	
	@Autowired
	private EnderecoPrestadorRepository enderecoPrestadorRepository;
	
	@Autowired
	private CategoriaRepository areaPorfissionalRepository;
	
	@Autowired
	private ProfissaoRepository servicosRepository;
	
	@Autowired
	private CurriculoRepository curriculoRepository;
	
	@Autowired
	private CursosRepository cursosRespository;
	
	@Autowired
	private ExperienciasRepository experienciasRespository;
	
	@Autowired
	private AvaliacoesRepository avaliacoesRespository;
	
	@Autowired
	private SolicitacaoServicoRepository solicitacaoRepository;
	
	@Autowired
	private ItensSolicitacaoRepository itensSolicitacaoRepository;
	
	
	public static void main(String[] args){
		SpringApplication.run(AppServicesApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub	
	SimpleDateFormat data = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
		
		
	Cliente cli1 = new Cliente(null,"Dagle"," Anderson",data.parse("22/10/1994 22:00"),"1432756311","063176845960",TipoPessoa.FISICA,TipoSexo.MASCULINO,"Dagle22","221094","dagle_life@hotmail.com");
	Cliente cli2 = new Cliente(null,"José ","",data.parse("05/12/1965 00:00"),"123453678","1234536789",TipoPessoa.JURIDICA,TipoSexo.MASCULINO,"Jose22","123","teste@hotmail.com");	
	cli2.getTelefones().addAll(Arrays.asList("77-991489740"));
	
	EnderecoCliente end1 = new EnderecoCliente(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio", cli1);
	cli1.setEndereco(end1);
	
	EnderecoCliente end2 = new EnderecoCliente(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio", cli2);
	cli2.setEndereco(end2);
	
			clienteRespository.saveAll(Arrays.asList(cli1,cli2));
			enderecoClienteRespository.saveAll(Arrays.asList(end1,end2));
			
	

			
	Categoria areaProf1= new Categoria(null, "Construção e Reforma");		
	Profissao prof1 = new Profissao(null, "Pintor",areaProf1);
	Profissao prof2 = new Profissao(null, "Programador",areaProf1);
	Profissao prof3 = new Profissao(null, "Engenheiro",areaProf1);
		areaProf1.getServicos().addAll(Arrays.asList(prof1,prof2,prof3));
		
		areaPorfissionalRepository.saveAll(Arrays.asList(areaProf1));
		servicosRepository.saveAll(Arrays.asList(prof1,prof2,prof3));
	
	Prestador prest1 = new Prestador(null,"Ceará Pintor","pinturas em geral","domiciliar", cli1,prof1);	
	EnderecoPrestador end3 = new EnderecoPrestador(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio",prest1);
			prest1.setEndereco(end3);
			
	Prestador prest2 = new Prestador(null,"Ceará Pintor","pinturas em geral","domiciliar", cli2,prof2);	
	EnderecoPrestador end4 = new EnderecoPrestador(null,"Barreiras","BA", "47800218", "Barreiras I", "Ceilandia", 255, "praça 26 de maio",prest2);
	prest2.setEndereco(end4);
			
			
	Curriculo c1 = new Curriculo(null, prest1);
	Curriculo c2 = new Curriculo(null, prest2);
	Cursos curso1 = new Cursos(null, "Oficina Coral", "Coral Titas Brasil","2 dias", c1);
	Cursos curso2 = new Cursos(null, "treinamento Suvenil ", "Suvenil tintas","7 dias ", c1);
	Cursos curso3 = new Cursos(null, "MBA full stack ", "IGTI","1 ano ", c2);
	Experiencias exp1 = new Experiencias(null,"Suvinil LTDA", "Pinto","2 anos",c1);
	c1.getCursos().addAll(Arrays.asList(curso1,curso2,curso3));
	c1.getExperiencias().addAll(Arrays.asList(exp1));
	
	prest1.setCurriculo(c1);
	prest2.setCurriculo(c2);
	
	SolicitacaoServico solicitacao = new SolicitacaoServico(null, "computador", cli1, prof1);
	ItensSolicitacao itensSolicitacao1 = new ItensSolicitacao(null, "5 anos", solicitacao);
	ItensSolicitacao itensSolicitacao2 = new ItensSolicitacao(null, "lentidao e virus", solicitacao);
	ItensSolicitacao itensSolicitacao3 = new ItensSolicitacao(null, "formatação", solicitacao);
	solicitacao.getItemServico().addAll(Arrays.asList(itensSolicitacao1,itensSolicitacao2,itensSolicitacao3));

	
	solicitacaoRepository.save(solicitacao);
	
	itensSolicitacaoRepository.saveAll(Arrays.asList(itensSolicitacao1,itensSolicitacao2,itensSolicitacao3));
	
	prestadorRepository.saveAll(Arrays.asList(prest1,prest2));
	enderecoPrestadorRepository.saveAll(Arrays.asList(end3,end4));

	
	
	curriculoRepository.saveAll(Arrays.asList(c1,c2));
	cursosRespository.saveAll(Arrays.asList(curso1,curso2,curso3));
	experienciasRespository.saveAll(Arrays.asList(exp1));
	
	
	Avaliacoes aval1 = new Avaliacoes(null, cli1, prest1, 5, "Um dos melhores pintores que ja contratei na vida");
	 prest1.getAvaliacoes().addAll(Arrays.asList(aval1));
	 
	 
	 
	 avaliacoesRespository.saveAll(Arrays.asList(aval1));
	 clienteRespository.saveAll(Arrays.asList(cli1));
	 prestadorRepository.saveAll(Arrays.asList(prest1));
			
			

		
	}
}
