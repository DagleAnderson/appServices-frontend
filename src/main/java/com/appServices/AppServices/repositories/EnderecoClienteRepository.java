package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appServices.AppServices.domain.EnderecoCliente;

@Repository
public interface EnderecoClienteRepository extends JpaRepository<EnderecoCliente, Integer>  {

}
