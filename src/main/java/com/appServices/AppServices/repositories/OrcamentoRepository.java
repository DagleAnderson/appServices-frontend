package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appServices.AppServices.domain.Orcamento;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Integer> {

}
