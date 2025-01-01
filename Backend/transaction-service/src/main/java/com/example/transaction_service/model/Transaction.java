package com.example.transaction_service.model;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "Transactions")
public class Transaction {
	
	private ObjectId _id;
	private CreditCardInfo[] creditcards;
	
    // Getters and setters 
	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public CreditCardInfo[] getCreditcards() {
		return creditcards;
	}
	public void setCreditcards(CreditCardInfo[] creditcards) {
		this.creditcards = creditcards;
	}
	public Transaction(ObjectId _id, CreditCardInfo[] creditcards) {
		super();
		this._id = _id;
		this.creditcards = creditcards;
	}
	



	
}
