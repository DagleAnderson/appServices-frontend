package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Pessoa;

@Repository
public interface PessoaRespository extends JpaRepository<Pessoa, Integer>  {

}
