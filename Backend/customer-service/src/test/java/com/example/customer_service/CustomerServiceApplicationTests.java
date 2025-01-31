package com.example.customer_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestPropertySource(properties = {
		"spring.data.mongodb.uri=mongodb://localhost:27017/testdb",
		"eureka.client.enabled=false",
		"spring.cloud.discovery.enabled=false"
})
class CustomerServiceApplicationTests {

	@Test
	void contextLoads() {
		CustomerServiceApplication.main(new String[] {});
		assertTrue(true); // Just verifies the application starts without errors
	}
}