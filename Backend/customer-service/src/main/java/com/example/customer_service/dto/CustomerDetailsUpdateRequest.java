package com.example.customer_service.dto;

import com.example.customer_service.model.Address;

import jakarta.validation.constraints.Email;

public class CustomerDetailsUpdateRequest {
    private Address newAddress;

    @Email(message = "Invalid email format")
    private String newEmail;

    // Getters and Setters
    public Address getNewAddress() {
        return newAddress;
    }

    public void setNewAddress(Address newAddress) {
        this.newAddress = newAddress;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

}
