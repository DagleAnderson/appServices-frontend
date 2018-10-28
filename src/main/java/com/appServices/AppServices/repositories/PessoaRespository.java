package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Usuario;

@Repository
public interface PessoaRespository extends JpaRepository<Usuario, Integer>  {

}
