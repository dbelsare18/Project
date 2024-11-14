package com.passengerservice.dto;

import java.math.BigInteger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object (DTO) class for transferring passenger data between different layers of the application.
 * 
 * This class is used to receive and validate passenger data in API requests.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PassengerDTO {

	  	private Long pnrNumber;
	  	
//	  	@NotBlank(message = "Passenger name is required")
	    private String passengerName;
	    
//	  	@Positive(message = "Passenger age is required")
	    private Integer passengerAge;
	    
	  	//@Digits(integer = 12, fraction = 0, message = "Passenger UIN must be a 12-digit number.")
//	  	@NotNull(message = "UIN is mandatory")
//	    @Size(min = 12, max = 12, message = "Passenger UIN must be exactly 12 digits long.")
//	    @Pattern(regexp = "\\d{12}", message = "Passenger UIN must be a 12-digit number.")
	    private String passengerUIN;
	    
	    private Double luggage;
	    
	    @NotBlank(message = "Gender is required")
	    private String gender;
	    
		public Long getPnrNumber() {
			return pnrNumber;
		}
		public void setPnrNumber(Long pnrNumber) {
			this.pnrNumber = pnrNumber;
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
		public String getPassengerUIN() {
			return passengerUIN;
		}
		public void setPassengerUIN(String passengerUIN) {
			this.passengerUIN = passengerUIN;
		}
		public Double getLuggage() {
			return luggage;
		}
		public void setLuggage(Double luggage) {
			this.luggage = luggage;
		}
		public String getGender() {
			return gender;
		}
		public void setGender(String gender) {
			this.gender = gender;
		}
	    
	    
}
