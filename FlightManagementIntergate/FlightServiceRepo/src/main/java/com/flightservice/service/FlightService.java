package com.flightservice.service;

import java.math.BigInteger;
import java.util.List;

import com.flightservice.request.FlightRequest;
import com.flightservice.response.FlightResponse;

public interface FlightService {
	
	public FlightResponse addFlight(FlightRequest flightRequest);
	
	public FlightResponse modifyFlight(FlightRequest flightRequest,BigInteger flightNumber);
	
	public FlightResponse getFlightByFlightNum(BigInteger flightNumber);
	
	public List<FlightResponse> getAllFlights();
	
	public void deleteFlight(BigInteger flightNumber);
	

}
