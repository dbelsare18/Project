package com.userservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.userservice.dto.UserDto;
import com.userservice.entities.UserEntity;
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	public void deleteUserByUserId(int userId);
	
	public Optional<UserEntity> findUserByUserId(int userId);

	public void deleteById(int userId);

	public Optional<UserEntity> findByEmail(String email);
	
}

