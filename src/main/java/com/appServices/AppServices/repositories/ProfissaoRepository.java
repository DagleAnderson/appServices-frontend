package com.appServices.AppServices.repositories;



import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.appServices.AppServices.domain.Categoria;
import com.appServices.AppServices.domain.Profissao;

@Repository
public interface ProfissaoRepository extends JpaRepository<Profissao, Integer>  {

	//Busca de profissões por Categoria
	@Transactional(readOnly=true)
	@Query("SELECT DISTINCT obj FROM Profissao obj INNER JOIN obj.categoria cat WHERE cat IN :categoria")
	Page<Profissao> search(@Param("categoria") Optional<Categoria> categoria, Pageable pageRequest);
}
