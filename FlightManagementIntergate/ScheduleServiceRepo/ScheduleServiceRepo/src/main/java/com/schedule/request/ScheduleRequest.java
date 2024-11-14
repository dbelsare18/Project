package com.schedule.request;

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

public class ScheduleRequest {
	private BigInteger scheduleId;
	private Airport srcAirport;
	private Airport dstnAirport;
	private LocalDateTime deptDateTime;
	private LocalDateTime arrDateTime;
	public BigInteger getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(BigInteger scheduleId) {
		this.scheduleId = scheduleId;
	}
	public Airport getSrcAirport() {
		return srcAirport;
	}
	public void setSrcAirport(Airport srcAirport) {
		this.srcAirport = srcAirport;
	}
	public Airport getDstnAirport() {
		return dstnAirport;
	}
	public void setDstnAirport(Airport dstnAirport) {
		this.dstnAirport = dstnAirport;
	}
	public LocalDateTime getDeptDateTime() {
		return deptDateTime;
	}
	public void setDeptDateTime(LocalDateTime deptDateTime) {
		this.deptDateTime = deptDateTime;
	}
	public LocalDateTime getArrDateTime() {
		return arrDateTime;
	}
	public void setArrDateTime(LocalDateTime arrDateTime) {
		this.arrDateTime = arrDateTime;
	}
	

}
