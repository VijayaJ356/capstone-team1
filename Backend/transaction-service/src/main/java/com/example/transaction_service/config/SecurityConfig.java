package com.example.transaction_service.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	     http
	         .authorizeHttpRequests(auth -> auth
	             .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll() // Allow Swagger
	             .requestMatchers("/api/transaction/**","/api/transaction?**").permitAll() // Allow registration
	             //.requestMatchers("/api/transaction/**").permitAll() // Allow registration
	             .anyRequest().authenticated() // Require authentication for other endpoints
	         )
	         .csrf(csrf -> csrf.disable()); // Disable CSRF for easier testing (only for development!)
	     return http.build();
	 }
}




