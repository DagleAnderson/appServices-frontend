package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Curriculo;

@Repository
public interface CurriculoRespository extends JpaRepository<Curriculo, Integer>  {

}
