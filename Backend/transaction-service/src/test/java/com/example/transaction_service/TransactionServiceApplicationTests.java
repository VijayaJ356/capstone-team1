package com.example.transaction_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class TransactionServiceApplicationTests {

	@Test
	void contextLoads() {
		TransactionServiceApplication.main(new String[] {});
		assertTrue(true); // Just verifies the application starts without errors
	}

}
