package com.passengerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.passengerservice.entity.PassengerEntity;

import jakarta.transaction.Transactional;

import java.math.BigInteger;
import java.util.List;
	
/**
 * PassengerRepository interface for managing PassengerEntity persistence.
 * 
 * This interface extends JpaRepository, providing CRUD operations
 * and custom query methods for PassengerEntity.
 */
@Repository
@Transactional
	public interface PassengerRepository extends JpaRepository<PassengerEntity, Long> {
	    List<PassengerEntity> findByPassengerNameIgnoreCase(String passengerName);
	    
	    @Query("SELECT p.passengerUIN FROM PassengerEntity p")
	    List<BigInteger> findAllPassengerUINs();
	    
	    boolean existsByPnrNumber(Long pnrNumber);

}
