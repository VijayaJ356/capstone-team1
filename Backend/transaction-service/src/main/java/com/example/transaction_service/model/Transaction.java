package com.example.transaction_service.model;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;



@Document(collection = "Transactions")
public class Transaction {
	
	private ObjectId _id;
	@NotNull
    @Size(min = 6, message = "Username must be at least 6 characters")
    @jakarta.validation.constraints.Pattern(regexp = "^[A-Za-z0-9_@]+$", message = "Username can contain only alphanumeric characters, '_' or '@'")
    private String username;
	private CreditCardInfo[] creditcards;
	
	 // Getters and setters 
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
	public CreditCardInfo[] getCreditcards() {
		return creditcards;
	}
	public void setCreditcards(CreditCardInfo[] creditcards) {
		this.creditcards = creditcards;
	}
	public Transaction(ObjectId _id,
			@NotNull @Size(min = 6, message = "Username must be at least 6 characters") @Pattern(regexp = "^[A-Za-z0-9_@]+$", message = "Username can contain only alphanumeric characters, '_' or '@'") String username,
			CreditCardInfo[] creditcards) {
		super();
		this._id = _id;
		this.username = username;
		this.creditcards = creditcards;
	}
	
}
