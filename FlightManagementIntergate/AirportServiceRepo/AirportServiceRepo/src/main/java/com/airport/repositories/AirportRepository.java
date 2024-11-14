package com.airport.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airport.entity.AirportEntity;

@Repository
public interface AirportRepository extends JpaRepository<AirportEntity, String> {

  
}
