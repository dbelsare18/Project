package com.schedule.service.impl;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schedule.entity.Airport;
import com.schedule.entity.ScheduleEntity;
import com.schedule.exception.ScheduleNotFoundException;
import com.schedule.repository.ScheduleRepository;
import com.schedule.request.ScheduleRequest;
import com.schedule.response.ScheduleResponse;
import com.schedule.service.AirportFeignClient;
import com.schedule.service.ScheduleService;
import com.schedule.service.ScheduledFlightClient;

@Service
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private AirportFeignClient airportFeignClient;

	@Autowired
	private ScheduledFlightClient scheduledFlightClient;

	@Override
	public ScheduleResponse addSchedule(ScheduleRequest scheduleRequest) {
		LocalDateTime deptDateTime = scheduleRequest.getDeptDateTime();
		LocalDateTime arrDateTime = scheduleRequest.getArrDateTime();

		validateDateTime(deptDateTime, arrDateTime);

		Airport srcAirportDetails = airportFeignClient
				.getAirportByCode(scheduleRequest.getSrcAirport().getAirportCode());
		Airport dstAirportDetails = airportFeignClient
				.getAirportByCode(scheduleRequest.getDstnAirport().getAirportCode());

		String ScheduleIdStr = generateScheduleId();

		BigInteger scheduleId = new BigInteger(ScheduleIdStr, 16);

		ScheduleEntity scheduleEntity = ScheduleEntity.builder().scheduleId(scheduleId)
				.srcAirportCode(srcAirportDetails.getAirportCode()).dstnAirportCode(dstAirportDetails.getAirportCode())
				.deptDateTime(deptDateTime).arrDateTime(arrDateTime).build();

		ScheduleEntity savedSchedule = scheduleRepository.save(scheduleEntity);
		return mapToResponse(savedSchedule);
	}

	private void validateDateTime(LocalDateTime deptDateTime, LocalDateTime arrDateTime) {
		LocalDateTime now = LocalDateTime.now();

		if (deptDateTime.isBefore(now)) {
			throw new ScheduleNotFoundException("Departure date and time cannot be in the past.");
		}

		if (arrDateTime.isBefore(now)) {
			throw new ScheduleNotFoundException("Arrival date and time cannot be in the past.");
		}

		if (arrDateTime.isBefore(deptDateTime)) {
			throw new ScheduleNotFoundException("Arrival date and time must be after departure date and time.");
		}
	}

	@Override
	public ScheduleResponse modifySchedule(BigInteger scheduleId, ScheduleRequest updatedSchedule) {
		LocalDateTime deptDateTime = updatedSchedule.getDeptDateTime();
		LocalDateTime arrDateTime = updatedSchedule.getArrDateTime();

		validateDateTime(deptDateTime, arrDateTime);

		ScheduleEntity existingSchedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new ScheduleNotFoundException("Schedule not found for ID: " + scheduleId));

		existingSchedule.setSrcAirportCode(updatedSchedule.getSrcAirport().getAirportCode());
		existingSchedule.setDstnAirportCode(updatedSchedule.getDstnAirport().getAirportCode());
		existingSchedule.setDeptDateTime(deptDateTime);
		existingSchedule.setArrDateTime(arrDateTime);

		ScheduleEntity modifiedSchedule = scheduleRepository.save(existingSchedule);
		return mapToResponse(modifiedSchedule);
	}

	@Override
	public ScheduleResponse getScheduleById(BigInteger scheduleId) {
		ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new ScheduleNotFoundException("Schedule not found for ID: " + scheduleId));
		return mapToResponse(schedule);
	}

	@Override
	public List<ScheduleResponse> getAllSchedules() {
		List<ScheduleEntity> schedules = scheduleRepository.findAll();
		return schedules.stream().map(this::mapToResponse).collect(Collectors.toList());
	}

	@Override
	public void deleteSchedule(BigInteger scheduleId) {
		ScheduleEntity existingSchedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new ScheduleNotFoundException("Schedule not found for ID: " + scheduleId));

		scheduledFlightClient.deleteScheduledFlightByScheduleId(existingSchedule.getScheduleId());

		scheduleRepository.delete(existingSchedule);
	}

	private ScheduleResponse mapToResponse(ScheduleEntity entity) {
		Airport srcAirportDetails = airportFeignClient.getAirportByCode(entity.getSrcAirportCode());
		Airport dstAirportDetails = airportFeignClient.getAirportByCode(entity.getDstnAirportCode());

		return ScheduleResponse.builder().scheduleId(entity.getScheduleId()).srcAirport(srcAirportDetails)
				.dstnAirport(dstAirportDetails).deptDateTime(entity.getDeptDateTime())
				.arrDateTime(entity.getArrDateTime()).build();
	}

	private String generateScheduleId() {
		return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
	}

	@Override
	public void deleteByAirportCode(String airportCode) {

		List<ScheduleEntity> scheduleEntities = scheduleRepository.findBySrcAirportCodeOrDstnAirportCode(airportCode,
				airportCode);

		scheduleEntities.stream()
				.forEach(schedule -> scheduledFlightClient.deleteScheduledFlightByScheduleId(schedule.getScheduleId()));

		scheduleRepository.deleteBySrcAirportCodeOrDstnAirportCode(airportCode, airportCode);

	}
}
