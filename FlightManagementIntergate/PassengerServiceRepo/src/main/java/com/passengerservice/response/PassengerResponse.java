package com.passengerservice.response;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * PassengerResponse class represents the response structure for passenger data.
 * 
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class PassengerResponse {
	
	private BigInteger passengerUIN;

	private Long pnrNumber;

	private String passengerName;

	private Integer passengerAge;

	private Double luggage;

}
