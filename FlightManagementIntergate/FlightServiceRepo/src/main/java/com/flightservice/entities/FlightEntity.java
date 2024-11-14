package com.flightservice.entities;

import java.math.BigInteger;

import com.flightservice.constants.FlightConstants;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@Table(name = FlightConstants.FLIGHT_TABLE)
public class FlightEntity {

	@Id
	@Column(name = FlightConstants.FLIGHT_NO)
	private BigInteger flightNumber;
	
	@Column(name = FlightConstants.CARRIER_NAME)
	private String carrierName;
	
	@Column(name = FlightConstants.FLIGHT_MODEL)
	private String flightModel;
	
	@Column(name = FlightConstants.SEAT_CAPACITY)
	private Integer seatCapacity;

	public BigInteger getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(BigInteger flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getCarrierName() {
		return carrierName;
	}

	public void setCarrierName(String carrierName) {
		this.carrierName = carrierName;
	}

	public String getFlightModel() {
		return flightModel;
	}

	public void setFlightModel(String flightModel) {
		this.flightModel = flightModel;
	}

	public Integer getSeatCapacity() {
		return seatCapacity;
	}

	public void setSeatCapacity(Integer seatCapacity) {
		this.seatCapacity = seatCapacity;
	}
	

}
