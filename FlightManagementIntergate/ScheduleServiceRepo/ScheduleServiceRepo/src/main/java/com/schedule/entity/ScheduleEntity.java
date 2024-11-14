package com.schedule.entity;

import java.math.BigInteger;
import java.time.LocalDateTime;

import com.schedule.constant.ScheduleConstant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@Table(name = ScheduleConstant.SCHEDULE_TABLE)
public class ScheduleEntity {

	@Id
	@Column(name = ScheduleConstant.SCHEDULE_ID)
	private BigInteger scheduleId;

	@Column(name = ScheduleConstant.SRC_AIRPORT)
	private String srcAirportCode;
	
	@Column(name = ScheduleConstant.DSTN_AIRPORT)
	private String dstnAirportCode;
	
	@Column(name = ScheduleConstant.DEPARTURE_DATE)
	private LocalDateTime deptDateTime; 

	@Column(name = ScheduleConstant.ARRIVAL_DATE)
	private LocalDateTime arrDateTime;

	public BigInteger getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(BigInteger scheduleId) {
		this.scheduleId = scheduleId;
	}

	public String getSrcAirportCode() {
		return srcAirportCode;
	}

	public void setSrcAirportCode(String srcAirportCode) {
		this.srcAirportCode = srcAirportCode;
	}

	public String getDstnAirportCode() {
		return dstnAirportCode;
	}

	public void setDstnAirportCode(String dstnAirportCode) {
		this.dstnAirportCode = dstnAirportCode;
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
