package com.schedule.response;

import java.math.BigInteger;
import java.time.LocalDateTime;

import com.schedule.entity.Airport;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class ScheduleResponse {

	private BigInteger scheduleId;
	private Airport srcAirport;
	private Airport dstnAirport;
	private LocalDateTime deptDateTime;
	private LocalDateTime arrDateTime;

}
