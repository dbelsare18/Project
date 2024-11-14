package com.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.authentication.entities.UserAuthEntity;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuthEntity, Integer> {

	Optional <UserAuthEntity> findByUsername(String username);

	Optional<UserAuthEntity> findByEmail(String email);
	
}
