package com.authentication.exception;

public class UserAuthenticationFailureException extends RuntimeException{

	public UserAuthenticationFailureException(String msg)
	{
		super(msg);
	}
}
