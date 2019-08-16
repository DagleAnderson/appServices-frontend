package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appServices.AppServices.domain.Experiencias;

@Repository
public interface ExperienciasRepository extends JpaRepository<Experiencias, Integer>  {

}
