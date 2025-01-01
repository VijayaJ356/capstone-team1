package com.example.transaction_service.model;

public class CreditCardInfo {
	private Integer creditCardId;
	private TransactionInfo[] transactions;
	public Integer getCreditCardId() {
		return creditCardId;
	}
	public void setCreditCardId(Integer creditCardId) {
		this.creditCardId = creditCardId;
	}
	public TransactionInfo[] getTransactions() {
		return transactions;
	}
	public void setTransactions(TransactionInfo[] transactions) {
		this.transactions = transactions;
	}
	public CreditCardInfo(Integer creditCardId, TransactionInfo[] transactions) {
		super();
		this.creditCardId = creditCardId;
		this.transactions = transactions;
	}
	

}
