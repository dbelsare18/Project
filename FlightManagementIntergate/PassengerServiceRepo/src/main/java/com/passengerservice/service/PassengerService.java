package com.passengerservice.service;

import com.passengerservice.dto.PassengerDTO;
import com.passengerservice.entity.PassengerEntity;
import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * PassengerService interface defines the contract for passenger-related operations.
 * 
 * This service provides methods to manage passenger entities, including adding, retrieving,
 * updating, and deleting passengers, as well as searching for passengers by name and retrieving
 * all unique identification numbers (UINs).
 */
@Service
public interface PassengerService {
	
	/**
     * Adds a new passenger.
     * @param passengerDTO The PassengerDTO object to save.
     * @return The saved PassengerDTO.
     */
    PassengerDTO addPassenger(PassengerDTO passengerDTO);

    /**
     * Retrieves a passenger by their PNR number.
     * @param pnrNumber The PNR number to search by.
     * @return The found PassengerDTO, or null if not found.
     */
    PassengerDTO getPassengerByPnr(Long pnrNumber);

    /**
     * Retrieves all passengers as PassengerDTOs.
     * @return A list of all PassengerDTO objects.
     */
    List<PassengerDTO> getAllPassengers();

    /**
     * Updates an existing passenger's details.
     * @param pnrNumber The PNR number of the passenger to update.
     * @param passengerDTO The PassengerDTO containing updated details.
     * @return The updated PassengerDTO.
     */
    PassengerDTO updatePassenger(Long pnrNumber, PassengerDTO passengerDTO);

    /**
     * Deletes a passenger by their PNR number.
     * @param pnrNumber The PNR number of the passenger to delete.
     * @return true if the passenger was deleted, false if not found.
     */
    boolean deletePassenger(Long pnrNumber);

    /**
     * Updates the luggage information for a passenger.
     * @param pnrNumber The PNR number of the passenger.
     * @param luggage The new luggage value.
     * @return The updated PassengerDTO, or null if not found.
     */
    PassengerDTO updateLuggage(Long pnrNumber, Double luggage);

    /**
     * Finds passengers by their name (case insensitive).
     * @param name The name to search for.
     * @return A list of passengers with the given name as PassengerDTOs.
     */
    List<PassengerDTO> findPassengersByName(String name);

    /**
     * Retrieves all passenger Unique Identification Numbers (UINs).
     * @return A list representing all passenger UINs.
     */
    List<BigInteger> getAllPassengerUINs();

}
