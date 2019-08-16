package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appServices.AppServices.domain.EnderecoPrestador;

@Repository
public interface EnderecoPrestadorRepository extends JpaRepository<EnderecoPrestador, Integer>  {

}
