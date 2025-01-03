package com.example.transaction_service.model;

import java.util.Random;

public class TransactionInfo {
	 private Long transactionId;
     private String transactionDate;
     private String transactionTime;
     private String transactionType; // db/cr
     private Double transactionAmount;

	
	
	   public Long getTransactionId() {
		return transactionId;
	}



	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}



	public String getTransactionDate() {
		return transactionDate;
	}



	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}



	public String getTransactionTime() {
		return transactionTime;
	}



	public void setTransactionTime(String transactionTime) {
		this.transactionTime = transactionTime;
	}



	public String getTransactionType() {
		return transactionType;
	}



	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}



	public Double getTransactionAmount() {
		return transactionAmount;
	}



	public void setTransactionAmount(Double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}
	
	



	public TransactionInfo(Long transactionId, String transactionDate, String transactionTime, String transactionType,
			Double transactionAmount) {
		super();
		this.transactionId = generateTransactionId();
		this.transactionDate = transactionDate;
		this.transactionTime = transactionTime;
		this.transactionType = transactionType;
		this.transactionAmount = transactionAmount;
	}



	private Long generateTransactionId() {
	        long timestamp = System.currentTimeMillis() % 100000000; // Take the last 8 digits of timestamp
	        int randomSuffix = new Random().nextInt(9000) + 1000;    // Generate a 4-digit random number
	        return (Long) (timestamp * 10000 + randomSuffix);         // Combine timestamp and random number
	    }
     

}
