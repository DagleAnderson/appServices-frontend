package com.appServices.AppServices.config;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.appServices.AppServices.Services.DBService;

@Configuration
@Profile("test")
public class TestConfig {

	@Autowired
	private DBService dbService;
	
	@Bean
	public Boolean isntantiateDataBase() throws ParseException{
		
	dbService.instantiateTestDataBase();	
		
		return true;
	}
}
