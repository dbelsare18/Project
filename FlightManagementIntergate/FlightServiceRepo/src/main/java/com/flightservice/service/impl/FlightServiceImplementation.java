package com.flightservice.service.impl;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flightservice.client.ScheduledFlightClient;
import com.flightservice.entities.FlightEntity;
import com.flightservice.exception.FlightNotFoundException;
import com.flightservice.repository.FlightRepository;
import com.flightservice.request.FlightRequest;
import com.flightservice.response.FlightResponse;
import com.flightservice.service.FlightService;

@Service
public class FlightServiceImplementation implements FlightService {

	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private ScheduledFlightClient scheduledFlightClient;

	@Override
	public FlightResponse addFlight(FlightRequest flightRequest) {

		String flightNoStr = generateFlightNumber();

		BigInteger flightNumber = new BigInteger(flightNoStr, 16);

		FlightEntity flightEntity = FlightEntity.builder().flightNumber(flightNumber)
				.carrierName(flightRequest.getCarrierName()).flightModel(flightRequest.getFlightModel())
				.seatCapacity(flightRequest.getSeatCapacity()).build();

		FlightEntity savedFlight = flightRepository.save(flightEntity);
		return mapToResponse(savedFlight);
	}

	private String generateFlightNumber() {
		return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
	}

	@Override
	public FlightResponse modifyFlight(FlightRequest flightRequest, BigInteger flightNumber) {
		FlightEntity existingFlight = flightRepository.findById(flightNumber).orElseThrow(
				() -> new FlightNotFoundException("Flight not found with given flightNUmber " + flightNumber));

		existingFlight.setCarrierName(flightRequest.getCarrierName());
		existingFlight.setFlightModel(flightRequest.getFlightModel());
		existingFlight.setSeatCapacity(flightRequest.getSeatCapacity());

		FlightEntity updatedFlight = flightRepository.save(existingFlight);
		return mapToResponse(updatedFlight);
	}

	@Override
	public FlightResponse getFlightByFlightNum(BigInteger flightNumber) {
		FlightEntity flightEntity = flightRepository.findById(flightNumber).orElseThrow(
				() -> new FlightNotFoundException("Flight not found with given FlightNumber " + flightNumber));
		return mapToResponse(flightEntity);
	}

	@Override
	public List<FlightResponse> getAllFlights() {
		List<FlightEntity> flights = flightRepository.findAll();
		return flights.stream().map(this::mapToResponse).collect(Collectors.toList());
	}

	@Override
	public void deleteFlight(BigInteger flightNumber) {
		if (!flightRepository.existsById(flightNumber)) {
			throw new FlightNotFoundException("Flight not found with given flightNumber " + flightNumber);
		}

		try {
			scheduledFlightClient.deleteFlightScheduledByFlightNumber(flightNumber);
		} catch (Exception e) {
			System.err.println("Schedule Flight service down");
		}

		flightRepository.deleteById(flightNumber);
	}

	private FlightResponse mapToResponse(FlightEntity flightEntity) {
		return FlightResponse.builder().flightNumber(flightEntity.getFlightNumber())
				.carrierName(flightEntity.getCarrierName()).flightModel(flightEntity.getFlightModel())
				.seatCapacity(flightEntity.getSeatCapacity()).build();
	}
}
