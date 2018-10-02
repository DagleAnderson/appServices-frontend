package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Prestador;

@Repository
public interface PrestadorRespository extends JpaRepository<Prestador, Integer>  {

}
