package com.flightservice.client;

import java.math.BigInteger;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ScheduledFlightClient", url = "http://localhost:7061")
public interface ScheduledFlightClient {

	//rameez
	@DeleteMapping("/scheduledflight/flight/{flightNumber}")
	String deleteFlightScheduledByFlightNumber(@PathVariable BigInteger flightNumber);

}
