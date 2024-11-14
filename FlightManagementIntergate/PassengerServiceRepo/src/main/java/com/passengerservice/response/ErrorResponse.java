package com.passengerservice.response;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * ErrorResponse class represents a standardized error response structure.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class ErrorResponse {

	private String errorCode;
	private HttpStatus status;
	private String message;


}
