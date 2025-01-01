package com.example.customer_service.exception;

public class InvalidEmailException extends RuntimeException {

    // Constructor that takes a custom message
    public InvalidEmailException(String message) {
        super(message);
    }

    // Optional: Constructor that takes a custom message and a cause
    public InvalidEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}