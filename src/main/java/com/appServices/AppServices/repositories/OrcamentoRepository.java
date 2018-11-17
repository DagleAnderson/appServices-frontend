package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appServices.AppServices.domain.orcamento;

public interface OrcamentoRepository extends JpaRepository<orcamento, Integer> {

}
