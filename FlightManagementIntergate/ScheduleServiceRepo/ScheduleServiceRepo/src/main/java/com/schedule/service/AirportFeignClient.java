package com.schedule.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.schedule.entity.Airport;

@FeignClient(name = "airport-service", url = "http://localhost:7062/api/airports")
public interface AirportFeignClient {

    @GetMapping("/{airportCode}")
    Airport getAirportByCode(@PathVariable("airportCode") String airportCode);
}
