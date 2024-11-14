package com.schedule.controller;

import com.schedule.request.ScheduleRequest;
import com.schedule.response.ScheduleResponse;
import com.schedule.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins="*")
@PreAuthorize("hasRole('admin')")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponse> addSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        ScheduleResponse scheduleResponse = scheduleService.addSchedule(scheduleRequest);
        return ResponseEntity.status(201).body(scheduleResponse);
    }

    @PutMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> modifySchedule(
            @PathVariable BigInteger scheduleId,
            @RequestBody ScheduleRequest updatedSchedule) {
        ScheduleResponse scheduleResponse = scheduleService.modifySchedule(scheduleId, updatedSchedule);
        return ResponseEntity.ok(scheduleResponse);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> getScheduleById(@PathVariable BigInteger scheduleId) {
        ScheduleResponse scheduleResponse = scheduleService.getScheduleById(scheduleId);
        return ResponseEntity.ok(scheduleResponse);
    }

    @GetMapping
    public ResponseEntity<List<ScheduleResponse>> getAllSchedules() {
        List<ScheduleResponse> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable BigInteger scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/deleteByAirportCode")
    public void deleteSchedulesByAirportCode(@RequestParam String airportCode) {
        scheduleService.deleteByAirportCode(airportCode);
    }
}
