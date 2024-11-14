package com.flightservice.controller;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightservice.request.FlightRequest;
import com.flightservice.response.FlightResponse;
import com.flightservice.service.FlightService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('admin')")
public class FlightController {

	@Autowired
	private FlightService flightService;

	// Create a new flight
	@PostMapping
	public ResponseEntity<FlightResponse> addFlight(@Valid @RequestBody FlightRequest flightRequest) {
		FlightResponse flightResponse = flightService.addFlight(flightRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(flightResponse);
	}

	// Update an existing flight
	@PutMapping("/{flightNo}")
	public ResponseEntity<FlightResponse> modifyFlight(@PathVariable BigInteger flightNo,
			@RequestBody FlightRequest flightRequest) {
		FlightResponse flightResponse = flightService.modifyFlight(flightRequest, flightNo);
		return ResponseEntity.ok(flightResponse);
	}

	// Get flight by flight number
	@GetMapping("/{flightNo}")
	public ResponseEntity<FlightResponse> getFlightByFlightNum(@PathVariable BigInteger flightNo) {
		FlightResponse flightResponse = flightService.getFlightByFlightNum(flightNo);
		return ResponseEntity.ok(flightResponse);
	}

	// Get all flights
	@GetMapping
	public ResponseEntity<List<FlightResponse>> getAllFlights() {
		List<FlightResponse> flightResponses = flightService.getAllFlights();
		return ResponseEntity.ok(flightResponses);
	}

	// Delete a flight
	@DeleteMapping("/{flightNo}")
	public ResponseEntity<Void> deleteFlight(@PathVariable BigInteger flightNo) {
		flightService.deleteFlight(flightNo);
		return ResponseEntity.noContent().build(); // Returns 204 No Content
	}
}
