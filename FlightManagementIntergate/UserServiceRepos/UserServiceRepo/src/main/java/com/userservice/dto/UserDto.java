package com.userservice.dto;

import java.math.BigInteger;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserDto {
	
	private Integer userId;
	
//	@NotNull
//	@NotBlank(message = "Username cannot be empty")
//    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")  
//	private String username;
//	
	@Email(message = "Email should be valid")
	@NotBlank(message = "Email cannot be empty")
	private String email;
	
//	@NotBlank(message = "User type cannot be empty")
//	private String userType;
//	
	//@NotBlank(message = "Phone number cannot be empty")
	 
	private BigInteger userPhone;
	
//	@NotBlank(message = "Password cannot be empty")
//	private String password;
	@NotBlank(message = "FirstName type cannot be empty")
	private String firstName;
	@NotBlank(message = "LastName type cannot be empty")
	private String lastName;
	@NotBlank(message = "Gender type cannot be empty")
	private String gender;
	 @Min(0)
	private int age;
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
//	public String getUsername() {
//		return username;
//	}
//	public void setUsername(String username) {
//		this.username = username;
//	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
//	public String getUserType() {
//		return userType;
//	}
//	public void setUserType(String userType) {
//		this.userType = userType;
//	}
	public BigInteger getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(BigInteger userPhone) {
		this.userPhone = userPhone;
	}
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}
	

}
