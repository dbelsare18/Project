package com.schedule.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "schedule-service", url = "http://localhost:7066/api/schedules")
public interface ScheduleFeignClient {
 
    @DeleteMapping("/deleteByAirportCode")
    void deleteSchedulesByAirportCode(@RequestParam("airportCode") String airportCode);
}
