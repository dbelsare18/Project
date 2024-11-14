package com.authentication.exception;

public class UserEmailNotExistingException extends RuntimeException{
	
public UserEmailNotExistingException(String msg)
{
	super(msg);
}
}