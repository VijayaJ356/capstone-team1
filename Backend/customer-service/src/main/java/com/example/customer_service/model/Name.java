package com.example.customer_service.model;

import jakarta.validation.constraints.NotNull;

public class Name {
	 @NotNull
     private String first;
     
     @NotNull
     private String last;


     // Getters and Setters
     public String getFirst() {
         return first;
     }

     public void setFirst(String first) {
         this.first = first;
     }

     public String getLast() {
         return last;
     }

     public void setLast(String last) {
         this.last = last;
     }

	public Name(@NotNull String first, @NotNull String last) {
		super();
		this.first = first;
		this.last = last;
	}
     
     
       
  

}
