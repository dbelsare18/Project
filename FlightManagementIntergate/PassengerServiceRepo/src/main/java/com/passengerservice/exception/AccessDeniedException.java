package com.passengerservice.exception;

public class AccessDeniedException extends RuntimeException {

	public AccessDeniedException(String msg)
	{
		super(msg);
	}
}
