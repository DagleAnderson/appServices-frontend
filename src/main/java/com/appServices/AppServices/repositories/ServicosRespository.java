package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Servicos;

@Repository
public interface ServicosRespository extends JpaRepository<Servicos, Integer>  {

}
