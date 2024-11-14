package com.schedule.service;

import java.math.BigInteger;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ScheduledFlightService", url = "http://localhost:7061/scheduledflight")
public interface ScheduledFlightClient {

//	@GetMapping("/scheduledflight/view-scheduledflight/{scheduledFlightId}")
//	ScheduledFlightResponse viewScheduledFlight(@PathVariable BigInteger scheduledFlightId);
//
//	@GetMapping("/scheduledflight/view-scheduledflights")
//	List<ScheduledFlightResponse> viewScheduledFlights();
//
//	@PutMapping("/scheduledflight/modify-scheduledflight/{scheduledFlightId}")
//	public ScheduledFlightResponse modifyScheduledFlight(@RequestBody ScheduledFlightRequest scheduledFlightRequest,
//			@PathVariable BigInteger scheduledFlightId);
//
//	@PostMapping("/scheduledflight/reset-available-seats/{scheduledFlightId}")
//	public String resetAvailableSeatsForAllScheduledFlight(
//			@PathVariable BigInteger scheduledFlightId);

	@DeleteMapping("/schedule/{scheduleId}")
	public ResponseEntity<String> deleteScheduledFlightByScheduleId(@PathVariable BigInteger scheduleId);

}
