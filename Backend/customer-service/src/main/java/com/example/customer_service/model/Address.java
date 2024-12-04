package com.example.customer_service.model;

import jakarta.validation.constraints.NotNull;

public class Address {
		@NotNull
	   	private String houseNo;
		@NotNull
	    private String street;
		@NotNull
	    private String city;
		@NotNull
	    private String pin;
		@NotNull
	    private String state;
		@NotNull
	    private String country;
		public String getHouseNo() {
			return houseNo;
		}
		public void setHouseNo(String houseNo) {
			this.houseNo = houseNo;
		}
		public String getStreet() {
			return street;
		}
		public void setStreet(String street) {
			this.street = street;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getPin() {
			return pin;
		}
		public void setPin(String pin) {
			this.pin = pin;
		}
		public String getState() {
			return state;
		}
		public void setState(String state) {
			this.state = state;
		}
		public String getCountry() {
			return country;
		}
		public void setCountry(String country) {
			this.country = country;
		}
		public Address(@NotNull String houseNo, @NotNull String street, @NotNull String city, @NotNull String pin,
				@NotNull String state, @NotNull String country) {
			super();
			this.houseNo = houseNo;
			this.street = street;
			this.city = city;
			this.pin = pin;
			this.state = state;
			this.country = country;
		}
		

}
