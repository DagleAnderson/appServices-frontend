package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appServices.AppServices.domain.SolicitacaoServico;

public interface SolicitacaoServicoRepository extends JpaRepository<SolicitacaoServico, Integer> {

}
