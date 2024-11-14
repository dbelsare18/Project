package com.schedule.service;

import java.math.BigInteger;
import java.util.List;

import com.schedule.request.ScheduleRequest;
import com.schedule.response.ScheduleResponse;

public interface ScheduleService {
	
	ScheduleResponse addSchedule(ScheduleRequest scheduleRequest);

	ScheduleResponse modifySchedule(BigInteger scheduleId, ScheduleRequest updatedSchedule);

	ScheduleResponse getScheduleById(BigInteger scheduleId);

	List<ScheduleResponse> getAllSchedules();

	void deleteSchedule(BigInteger scheduleId);

	void deleteByAirportCode(String airportCode);
}
