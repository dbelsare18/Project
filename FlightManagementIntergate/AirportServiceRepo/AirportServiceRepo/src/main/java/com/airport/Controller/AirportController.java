package com.airport.Controller;

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

import com.airport.Service.AirportService;
import com.airport.request.AirportRequest;
import com.airport.response.AirportResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/airports")
@CrossOrigin(origins="*")
@PreAuthorize("hasRole('admin')")
public class AirportController {

	@Autowired
	private AirportService airportService;

	@PostMapping
	public ResponseEntity<AirportResponse> addAirport(@Valid @RequestBody AirportRequest airportRequest) {
		AirportResponse airportResponse = airportService.addAirport(airportRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(airportResponse);
	}

	@GetMapping("/{airportCode}")
	public ResponseEntity<AirportResponse> getAirportByCode(@PathVariable String airportCode) {
		AirportResponse airportResponse = airportService.getAirportByCode(airportCode);
		return ResponseEntity.ok(airportResponse);
	}

	@GetMapping
	public ResponseEntity<List<AirportResponse>> getAllAirports() {
		List<AirportResponse> airportResponses = airportService.getAllAirports();
		return ResponseEntity.ok(airportResponses);
	}

	@DeleteMapping("/{airportCode}")
	public ResponseEntity<Void> deleteAirport(@PathVariable String airportCode) {
		airportService.deleteAirport(airportCode);
		return ResponseEntity.noContent().build(); // Returns 204 No Content
	}

	@PutMapping("/{airportCode}")
	public ResponseEntity<AirportResponse> modifyAirport(@PathVariable String airportCode,
			@Valid @RequestBody AirportRequest airportRequest) {
		AirportResponse airportResponse = airportService.modifyAirport(airportCode, airportRequest);
		return ResponseEntity.ok(airportResponse);
	}
}
