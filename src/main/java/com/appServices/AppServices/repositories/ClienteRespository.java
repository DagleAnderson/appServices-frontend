package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appServices.AppServices.domain.Cliente;

@Repository
public interface ClienteRespository extends JpaRepository<Cliente, Integer>  {

}
