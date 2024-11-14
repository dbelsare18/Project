package com.airport.Service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airport.Service.AirportService;
import com.airport.Service.ScheduleFeignClient;
import com.airport.entity.AirportEntity;
import com.airport.exception.AirportNotFoundException;
import com.airport.repositories.AirportRepository;
import com.airport.request.AirportRequest;
import com.airport.response.AirportResponse;

@Service
public class AirportServiceImpl implements AirportService {

	@Autowired
	private AirportRepository airportRepository;

	@Autowired
	private ScheduleFeignClient scheduleFeignClient;

	@Override
	public AirportResponse addAirport(AirportRequest airportRequest) {
		AirportEntity airportEntity = new AirportEntity();
		airportEntity.setAirportCode(airportRequest.getAirportCode());
		airportEntity.setAirportName(airportRequest.getAirportName());
		airportEntity.setAirportLocation(airportRequest.getAirportLocation());

		airportRepository.save(airportEntity);

		return mapToResponse(airportEntity);
	}

	@Override
	public AirportResponse getAirportByCode(String airportCode) {
		AirportEntity airportEntity = airportRepository.findById(airportCode)
				.orElseThrow(() -> new AirportNotFoundException("Airport with code " + airportCode + " not found"));
		return mapToResponse(airportEntity);
	}

	@Override
	public List<AirportResponse> getAllAirports() {
		List<AirportEntity> airportEntities = airportRepository.findAll();
		return airportEntities.stream().map(this::mapToResponse).collect(Collectors.toList());
	}

	@Override
	public AirportResponse modifyAirport(String airportCode, AirportRequest airportRequest) {
		AirportEntity airportEntity = airportRepository.findById(airportCode)
				.orElseThrow(() -> new AirportNotFoundException("Airport with code " + airportCode + " not found"));

		airportEntity.setAirportName(airportRequest.getAirportName());
		airportEntity.setAirportLocation(airportRequest.getAirportLocation());

		airportRepository.save(airportEntity);

		return mapToResponse(airportEntity);
	}

	private AirportResponse mapToResponse(AirportEntity airportEntity) {
		AirportResponse response = new AirportResponse();
		response.setAirportCode(airportEntity.getAirportCode());
		response.setAirportName(airportEntity.getAirportName());
		response.setAirportLocation(airportEntity.getAirportLocation());
		return response;
	}

	@Override
	public void deleteAirport(String airportCode) {

		// deleting schedules from Schedule Service

		scheduleFeignClient.deleteSchedulesByAirportCode(airportCode);

		airportRepository.deleteById(airportCode);
	}
}
