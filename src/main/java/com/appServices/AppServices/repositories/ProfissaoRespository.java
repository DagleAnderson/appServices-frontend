package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Profissao;

@Repository
public interface ProfissaoRespository extends JpaRepository<Profissao, Integer>  {

}
