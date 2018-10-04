package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Avaliacoes;

@Repository
public interface AvaliacoesRespository extends JpaRepository<Avaliacoes, Integer>  {

}
