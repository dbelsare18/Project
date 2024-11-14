package com.userservice.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.userservice.dto.UserDto;
import com.userservice.exception.UserNotFoundException;

@Service
public interface UserService {
	

	UserDto addUser(UserDto userdto);
	
	//UserEntity getUserById(Integer userId) throws UserNotFoundException;
	UserDto getUserById(Integer userId) throws UserNotFoundException;
	
	//List<UserEntity> getUser();
	List<UserDto> getUser();
	
	//public String deleteUserById(int userId);
	
	// void deleteUser(UserDto userDto) throws UserNotFoundException;
	
	//public UserEntity updateProfile(int id, UserDto userdto) ;
	UserDto updateUserById(Integer userId, UserDto userDto) throws UserNotFoundException; 

	//void validateUser(UserDto userdto);

	void deleteUserById(Integer userId);

	Map<String, Object> getclaimsfromtoken(String token);

	UserDto getUserByEmail(String email) throws UserNotFoundException;

}
