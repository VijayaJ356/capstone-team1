package com.example.customer_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.NOT_FOUND, reason="Customer id doesn't exist")
public class InvalidCustomerIdException extends Exception {

}
