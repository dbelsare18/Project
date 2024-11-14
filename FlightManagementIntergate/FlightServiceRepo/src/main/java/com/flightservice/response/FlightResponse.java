package com.flightservice.response;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class FlightResponse {
	
	private BigInteger flightNumber;
	private String carrierName;
	private String flightModel;
	private Integer seatCapacity;


}
