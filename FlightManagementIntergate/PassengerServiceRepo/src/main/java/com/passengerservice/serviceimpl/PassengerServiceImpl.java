package com.passengerservice.serviceimpl;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.passengerservice.dto.PassengerDTO;
import com.passengerservice.entity.PassengerEntity;
import com.passengerservice.repository.PassengerRepository;
import com.passengerservice.service.PassengerService;

/**
 * Implementation of the PassengerService interface handles business logic for
 * passenger-related operations.
 */
@Service
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerRepository passengerRepository;

	private long generateUniquePnr() {
		UUID uuid = UUID.randomUUID();
		
	    return Math.abs(uuid.getMostSignificantBits() % 10000000000L);

		
//		return uuid.getMostSignificantBits() & Long.MAX_VALUE;
	}

	/**
	 * Adds a new passenger by converting DTO to entity and saving it.
	 * 
	 * @param passengerDTO The PassengerDTO object to save.
	 * @return The saved PassengerDTO.
	 */
	@Override
	public PassengerDTO addPassenger(PassengerDTO passengerDTO) {
		PassengerEntity passengerEntity = convertToEntity(passengerDTO);
		if (passengerEntity.getPnrNumber() == null) {
			passengerEntity.setPnrNumber(generateUniquePnr());
			System.out.println("pnr number set : "+passengerEntity.getPnrNumber() );
		}
		
		
		PassengerEntity createdPassenger = passengerRepository.save(passengerEntity);
		System.out.println("pnr number set in db : "+passengerEntity.getPnrNumber() );

		return convertToDTO(createdPassenger);
	}

	/**
	 * Retrieves a passenger by their PNR number.
	 * 
	 * @param pnrNumber The PNR number to search by.
	 * @return The found PassengerDTO, or null if not found.
	 */
	@Override
	public PassengerDTO getPassengerByPnr(Long pnrNumber) {
		PassengerEntity passengerEntity = passengerRepository.findById(pnrNumber).orElse(null);
		return passengerEntity != null ? convertToDTO(passengerEntity) : null;
	}

	/**
	 * Retrieves all passengers as PassengerDTOs.
	 * 
	 * @return A list of all PassengerDTO objects.
	 */
	@Override
	public List<PassengerDTO> getAllPassengers() {
		List<PassengerEntity> passengers = passengerRepository.findAll();
		return passengers.stream().map(this::convertToDTO).toList();
	}

	/**
	 * Updates an existing passenger's details.
	 * 
	 * @param pnrNumber    The PNR number of the passenger to update.
	 * @param passengerDTO The PassengerDTO containing updated details.
	 * @return The updated PassengerDTO.
	 */
	@Override
	public PassengerDTO updatePassenger(Long pnrNumber, PassengerDTO passengerDTO) {

		if (Long.valueOf(0).equals(pnrNumber)) {
			PassengerEntity passengerEntity = convertToEntity(passengerDTO);
			passengerEntity.setPnrNumber(generateUniquePnr());

			return convertToDTO(passengerRepository.save(passengerEntity));
		}

		PassengerEntity existingPassenger = passengerRepository.findById(pnrNumber).orElse(null);
		if (existingPassenger != null) {
			existingPassenger.setPassengerName(passengerDTO.getPassengerName());
			existingPassenger.setPassengerAge(passengerDTO.getPassengerAge());
			existingPassenger.setPassengerUIN(passengerDTO.getPassengerUIN());
			existingPassenger.setLuggage(passengerDTO.getLuggage());
			existingPassenger.setGender(passengerDTO.getGender());
			PassengerEntity updatedPassenger = passengerRepository.save(existingPassenger);
			return convertToDTO(updatedPassenger);
		}
		return null;
	}

	/**
	 * Deletes a passenger by their PNR number.
	 * 
	 * @param pnrNumber The PNR number of the passenger to delete.
	 * @return true if the passenger was deleted, false if not found.
	 */
	@Override
	public boolean deletePassenger(Long pnrNumber) {

		if (Long.valueOf(0).equals(pnrNumber)) {
			passengerRepository.deleteAll();
			return true;
		}

		if (passengerRepository.existsById(pnrNumber)) {
			passengerRepository.deleteById(pnrNumber);
			return true;
		}
		return false;
	}

	/**
	 * Updates the luggage information for a passenger.
	 * 
	 * @param pnrNumber The PNR number of the passenger.
	 * @param luggage   The new luggage value.
	 * @return The updated PassengerDTO, or null if not found.
	 */
	@Override
	public PassengerDTO updateLuggage(Long pnrNumber, Double luggage) {
		Optional<PassengerEntity> passenger = passengerRepository.findById(pnrNumber);
		if (passenger.isPresent()) {
			PassengerEntity existingPassenger = passenger.get();
			existingPassenger.setLuggage(luggage);
			PassengerEntity updatedPassenger = passengerRepository.save(existingPassenger);
			return convertToDTO(updatedPassenger);
		}
		return null;
	}

	/**
	 * Finds passengers by their name (case insensitive).
	 * 
	 * @param name The name to search for.
	 * @return A list of passengers with the given name as PassengerDTOs.
	 */
	@Override
	public List<PassengerDTO> findPassengersByName(String name) {
		List<PassengerEntity> passengers = passengerRepository.findByPassengerNameIgnoreCase(name);
		return passengers.stream().map(this::convertToDTO).toList();
	}

	/**
	 * Retrieves all passenger Unique Identification Numbers (UINs).
	 * 
	 * @return A list representing all passenger UINs.
	 */
	@Override
	public List<BigInteger> getAllPassengerUINs() {
		return passengerRepository.findAllPassengerUINs();
	}

	/**
	 * Converts a PassengerDTO to a PassengerEntity.
	 * 
	 * @param passengerDTO The DTO to convert.
	 * @return The corresponding PassengerEntity.
	 */
	private PassengerEntity convertToEntity(PassengerDTO passengerDTO) {
		PassengerEntity passengerEntity = new PassengerEntity();
		passengerEntity.setPassengerName(passengerDTO.getPassengerName());
		passengerEntity.setPassengerAge(passengerDTO.getPassengerAge());
		passengerEntity.setPassengerUIN(passengerDTO.getPassengerUIN());
		passengerEntity.setLuggage(passengerDTO.getLuggage());
		passengerEntity.setGender(passengerDTO.getGender());
		return passengerEntity;
	}

	/**
	 * Converts a PassengerEntity to a PassengerDTO.
	 * 
	 * @param passengerEntity The entity to convert.
	 * @return The corresponding PassengerDTO.
	 */
	private PassengerDTO convertToDTO(PassengerEntity passengerEntity) {
		PassengerDTO passengerDTO = new PassengerDTO();
		passengerDTO.setPnrNumber(passengerEntity.getPnrNumber());
		passengerDTO.setPassengerName(passengerEntity.getPassengerName());
		passengerDTO.setPassengerAge(passengerEntity.getPassengerAge());
		passengerDTO.setPassengerUIN(passengerEntity.getPassengerUIN());
		passengerDTO.setLuggage(passengerEntity.getLuggage());
		passengerDTO.setGender(passengerEntity.getGender());
		return passengerDTO;
	}

}
