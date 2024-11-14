package com.schedule.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schedule.entity.ScheduleEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, BigInteger> {

	void deleteBySrcAirportCodeOrDstnAirportCode(String airportCode, String airportCode2);

	List<ScheduleEntity> findBySrcAirportCodeOrDstnAirportCode(String airportCode, String airportCode2);

}
