package com.passengerservice.entity;

import com.passengerservice.constant.PassengerConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Entity class representing a passenger in the Flight Management System.
 */
@Entity
@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class PassengerEntity {
		
		@Column(name = PassengerConstants.PASSENGER_UIN)
		private String passengerUIN;

		@Id
		@Column(name = PassengerConstants.PNR_NUMBER)
		private Long pnrNumber;

		@Column(name = PassengerConstants.PASSENGER_NAME)
		private String passengerName;

		@Column(name = PassengerConstants.PASSENGER_AGE)
		private Integer passengerAge;

		@Column(name = PassengerConstants.LUGGAGE)
		private Double luggage;
		
		@Column(name = PassengerConstants.GENDER)
		private String gender;
		
		

		public String getGender() {
			return gender;
		}
		public void setGender(String gender) {
			this.gender = gender;
		}
		public void setLuggage(Double luggage) {
		    this.luggage = luggage;
		}
		public Double getLuggage() {
			return luggage;
		}
		
		public String getPassengerUIN() {
			return passengerUIN;
		}

		public Long getPnrNumber() {
			return pnrNumber;
		}
		public void setPnrNumber(Long pnrNumber) {
			this.pnrNumber = pnrNumber;
		}
		public void setPassengerUIN(String passengerUIN) {
			this.passengerUIN = passengerUIN;
		}

		public String getPassengerName() {
			return passengerName;
		}

		public void setPassengerName(String passengerName) {
			this.passengerName = passengerName;
		}

		public Integer getPassengerAge() {
			return passengerAge;
		}

		public void setPassengerAge(Integer passengerAge) {
			this.passengerAge = passengerAge;
		}
	    
		

}
