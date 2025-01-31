package com.example.customer_service.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.example.customer_service.model.Address;
import com.example.customer_service.model.Customer;
import com.example.customer_service.model.Name;
import com.example.customer_service.service.CustomerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import static org.junit.jupiter.api.Assertions.*;
import com.example.customer_service.dto.CustomerDetailsUpdateRequest;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.data.mongodb.uri=mongodb://localhost:27017/testdb",
        "eureka.client.enabled=false",
        "spring.cloud.discovery.enabled=false",
        "encryption.secret.key=testSecretKey123"
})
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CustomerController controller;

    @MockBean
    private CustomerService customerService;

    @Autowired
    private ObjectMapper objectMapper;

    private Customer testCustomer;

    @BeforeEach
    void setUp() {
        Name name = new Name("John", "Doe");
        Address address = new Address("123", "Main St", "City", "12345", "State", "Country");
        testCustomer = new Customer(null, "johndoe", "Password@123", name,
                LocalDate.of(1990, 1, 1), Customer.Sex.MALE, "john@example.com",
                12345, address, true, null, false, true, null, null, null, null, null, null, null);
    }

//    @Test
//    void registerCustomer_Success() throws Exception {
//        when(customerService.registerCustomer(any(Customer.class)))
//                .thenReturn("Customer Registered Successfully, please validate your credit card on first login");
//
//        mockMvc.perform(post("/api/customer/register")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(testCustomer)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Customer Registered Successfully, please validate your credit card on first login"));
//    }

    @Test
    void getCustomer_Success() throws Exception {
        when(customerService.getCustomerById(12345)).thenReturn(testCustomer);

        mockMvc.perform(get("/api/customer/12345"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("johndoe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void updateEmail_Success() throws Exception {
        mockMvc.perform(put("/api/customer/johndoe/email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"newEmail\":\"newemail@example.com\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void updateCustomerDetails_WhenAddressUpdateFails_ReturnsNotFound() {
        CustomerDetailsUpdateRequest request = new CustomerDetailsUpdateRequest();
        Address newAddress = new Address("123", "Street", "City", "12345", "State", "Country");
        request.setNewAddress(newAddress);
        when(customerService.updateCustomerAddress(anyString(), any()))
                .thenReturn(false);

        ResponseEntity<String> response = controller.updateCustomerDetails("user1", request);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void updateCustomerDetails_WhenBothUpdatesSucceed_ReturnsOk() {
        CustomerDetailsUpdateRequest request = new CustomerDetailsUpdateRequest();
        Address newAddress = new Address("123", "Street", "City", "12345", "State", "Country");
        request.setNewAddress(newAddress);
        request.setNewEmail("new@email.com");
        when(customerService.updateCustomerAddress(anyString(), any()))
                .thenReturn(true);

        ResponseEntity<String> response = controller.updateCustomerDetails("user1", request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}