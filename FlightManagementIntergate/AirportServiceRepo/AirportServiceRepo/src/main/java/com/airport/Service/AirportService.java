package com.airport.Service;

import java.util.List;

import com.airport.request.AirportRequest;
import com.airport.response.AirportResponse;

public interface AirportService {

	AirportResponse addAirport(AirportRequest airportRequest);

	AirportResponse getAirportByCode(String airportCode);

	List<AirportResponse> getAllAirports();

	void deleteAirport(String airportCode);

	AirportResponse modifyAirport(String airportCode, AirportRequest airportRequest);

}
