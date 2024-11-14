package com.passengerservice.controller;

import java.math.BigInteger;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.passengerservice.dto.PassengerDTO;
import com.passengerservice.service.PassengerService;

import jakarta.validation.Valid;

/**
 * This RestController class is used to create ,update, get, delete passenger details
 * 
 */
@RestController
@RequestMapping("/api/passengers")
@Validated
@CrossOrigin(origins="*")
@PreAuthorize("hasRole('admin')")
public class PassengerController {
	
	
	@Autowired
    private PassengerService passengerService;

    private static final Logger logger = LoggerFactory.getLogger(PassengerController.class);

    @PostMapping
    public ResponseEntity<PassengerDTO> addPassenger(@Valid @RequestBody PassengerDTO passengerDTO) {
        PassengerDTO createdPassenger = passengerService.addPassenger(passengerDTO);
        logger.info("Passenger added successfully: {}", createdPassenger);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPassenger);
    }

    @GetMapping("/{pnrNumber}")
    public ResponseEntity<PassengerDTO> getPassengerByPnr(@PathVariable Long pnrNumber) {
        PassengerDTO passenger = passengerService.getPassengerByPnr(pnrNumber);
        return passenger != null ? ResponseEntity.ok(passenger) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<PassengerDTO>> getAllPassengers() {
        List<PassengerDTO> passengers = passengerService.getAllPassengers();
        return ResponseEntity.ok(passengers);
    }

    @PutMapping("/{pnrNumber}")
    public ResponseEntity<PassengerDTO> updatePassenger(@PathVariable Long pnrNumber, @RequestBody PassengerDTO passengerDTO) {
        logger.info("Updating passenger with PNR: {}", pnrNumber);
        PassengerDTO updatedPassenger = passengerService.updatePassenger(pnrNumber, passengerDTO);
        if (updatedPassenger == null) {
            logger.error("Passenger with PNR {} not found", pnrNumber);
            return ResponseEntity.notFound().build();
        }
        logger.info("Passenger updated successfully: {}", updatedPassenger);
        return ResponseEntity.ok(updatedPassenger);
    }

    @DeleteMapping("/{pnrNumber}")
    public ResponseEntity<Void> deletePassenger(@PathVariable Long pnrNumber) {
        boolean deleted = passengerService.deletePassenger(pnrNumber);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{pnrNumber}/luggage")
    public ResponseEntity<PassengerDTO> updateLuggage(@PathVariable Long pnrNumber, @RequestParam Double luggage) {
        PassengerDTO updatedPassenger = passengerService.updateLuggage(pnrNumber, luggage);
        return updatedPassenger != null ? ResponseEntity.ok(updatedPassenger) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PassengerDTO>> findPassengersByName(@RequestParam String name) {
        List<PassengerDTO> passengers = passengerService.findPassengersByName(name);
        return ResponseEntity.ok(passengers);
    }

    @GetMapping("/uins")
    public ResponseEntity<List<BigInteger>> getAllPassengerUINs() {
        List<BigInteger> uins = passengerService.getAllPassengerUINs();
        return ResponseEntity.ok(uins);
    }

}
