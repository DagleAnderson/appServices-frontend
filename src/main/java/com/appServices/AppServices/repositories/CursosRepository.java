package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.Cursos;

@Repository
public interface CursosRepository extends JpaRepository<Cursos, Integer>  {

}
