package com.passengerservice.request;

import java.math.BigInteger;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * PassengerRequest class represents a request for passenger data.
 * 
 * This class is used to encapsulate the details of a passenger request
 * such as passenger UIN, PNR number, name, age, and luggage information.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@Component
public class PassengerRequest {
	
	private BigInteger passengerUIN;

	private Long pnrNumber;

	private String passengerName;

	private Integer passengerAge;

	private Double luggage;


}
