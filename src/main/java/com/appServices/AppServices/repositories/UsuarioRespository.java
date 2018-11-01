package com.appServices.AppServices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.domain.Usuario;

@Repository
public interface UsuarioRespository extends JpaRepository<Usuario, Integer>  {

	@Transactional(readOnly =true)
	Usuario findByEmail(String email);
}
