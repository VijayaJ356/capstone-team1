package com.example.customer_service.model;

import java.time.LocalDate;
import java.util.Date;

import org.bson.types.ObjectId;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;



import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Document(collection = "Customer")
public class Customer {
		@Id
		private ObjectId _id;
		

		@NotNull
	    @Size(min = 6, message = "Username must be at least 6 characters")
	    @jakarta.validation.constraints.Pattern(regexp = "^[A-Za-z0-9_@]+$", message = "Username can contain only alphanumeric characters, '_' or '@'")
	    private String username;

	    @NotBlank(message = "Password is required")
	    @Size(min = 6, message = "Password should be at least 6 characters")
	    private String password;
	    
	    
	    @NotNull
	    private Name name;
	    
	    @NotNull
	    @DateTimeFormat(pattern = "dd/MM/yyyy")
	    private LocalDate dob; // dd/MM/yyyy
	    
	    @NotNull
	    private Sex sex; // MALE/FEMALE/TRANSGENDER
	    
	    @Email(message = "Invalid email format")
	    @NotBlank(message = "Email is required")
	    private String email;

	    @NotNull
		private Integer customerId;
	    
	    @NotNull
	    private Address address;

	    @NotNull
	    private boolean active;
	    
	    @CreatedDate
	    @DateTimeFormat(pattern = "dd/MM/yyyy")
	    private Date createdAt;
	    
	    
	    // Enum for Sex
	    public enum Sex {
	        MALE, FEMALE, TRANSGENDER
	    }

		public ObjectId get_id() {
			return _id;
		}

		public void set_id(ObjectId _id) {
			this._id = _id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Name getName() {
			return name;
		}

		public void setName(Name name) {
			this.name = name;
		}

		public LocalDate getDob() {
			return dob;
		}

		public void setDob(LocalDate dob) {
			this.dob = dob;
		}

		public Sex getSex() {
			return sex;
		}

		public void setSex(Sex sex) {
			this.sex = sex;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Integer getCustomerId() {
			return customerId;
		}

		public void setCustomerId(Integer customerId) {
			this.customerId = customerId;
		}

		public Address getAddress() {
			return address;
		}

		public void setAddress(Address address) {
			this.address = address;
		}

		public boolean isActive() {
			return active;
		}

		public void setActive(boolean active) {
			this.active = active;
		}

		public Date getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

		public Customer(ObjectId _id,
				@NotNull @Size(min = 6, message = "Username must be at least 6 characters") @Pattern(regexp = "^[A-Za-z0-9_@]+$", message = "Username can contain only alphanumeric characters, '_' or '@'") String username,
				@NotBlank(message = "Password is required") @Size(min = 6, message = "Password should be at least 6 characters") String password,
				@NotNull Name name, @NotNull LocalDate dob, @NotNull Sex sex,
				@Email(message = "Invalid email format") @NotBlank(message = "Email is required") String email,
				@NotNull Integer customerId, @NotNull Address address, @NotNull boolean active, Date createdAt) {
			super();
			this._id = _id;
			this.username = username;
			this.password = password;
			this.name = name;
			this.dob = dob;
			this.sex = sex;
			this.email = email;
			this.customerId = customerId;
			this.address = address;
			this.active = active;
			this.createdAt = createdAt;
		}
		


		

}


