package com.appServices.AppServices.Services.Validation;
import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.appServices.AppServices.Services.Validation.utils.BR;
import com.appServices.AppServices.domain.Cliente;
import com.appServices.AppServices.domain.enums.TipoPessoa;
import com.appServices.AppServices.dto.ClienteNewDTO;
import com.appServices.AppServices.repositories.ClienteRepository;
import com.appServices.AppServices.resources.exception.FieldMessage;

public class ClienteInsertValidator implements ConstraintValidator<ClienteInsert, ClienteNewDTO> {

	@Autowired
	private ClienteRepository repository;
	
	
	@Override
	public void initialize(ClienteInsert ann) {
	}

	@Override
	public boolean isValid(ClienteNewDTO objDto, ConstraintValidatorContext context) {

		List<FieldMessage> list = new ArrayList<>();
			
		if(objDto.getTipoPessoa().equals(TipoPessoa.FISICA.getCod()) &&  !BR.isValidCPF(objDto.getCpfOuCnpj())) {
			list.add(new FieldMessage("cpfOuCnpj","CPF inválido!"));
		};
		
		
		if(objDto.getTipoPessoa().equals(TipoPessoa.JURIDICA.getCod()) &&  !BR.isValidCPF(objDto.getCpfOuCnpj())) {
			list.add(new FieldMessage("cpfOuCnpj","CNPJ inválido!"));
		};
		
		Cliente aux = repository.findByEmail(objDto.getEmail());
		if(aux != null) {
			list.add(new FieldMessage("email","email já existente"));
		}
		
		
			
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}

