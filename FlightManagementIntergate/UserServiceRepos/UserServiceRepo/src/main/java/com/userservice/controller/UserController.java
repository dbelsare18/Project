package com.userservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.userservice.dto.UserDto;
import com.userservice.service.UserService;

import jakarta.validation.Valid;


/**
 * * This RestController class is used to create ,update, get, delete user
 * data
 * @param userdto
 * @return
 */

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
@PreAuthorize("hasRole('admin')")
public class UserController {

	@Autowired
	private UserService userService;

	
	/**
	 * This Mapping method is used to get data of user from user using
	 *  add that data into the database
	 * 
	 * */
	
	@PostMapping("/save")
	public ResponseEntity<UserDto> addUser(@Valid @RequestBody UserDto userdto)
	{
		UserDto newUserDto = userService.addUser(userdto);
		ResponseEntity<UserDto> responseEntity = new ResponseEntity<>(newUserDto,HttpStatus.CREATED);
		return responseEntity;
		
	}
	
	@GetMapping("/id/{id}")
	
	public ResponseEntity<UserDto> fetchUserDetails(@PathVariable("id") int userId) {
	    UserDto userDto = userService.getUserById(userId);
	    return new ResponseEntity<>(userDto, HttpStatus.OK);
	}
	
	 @GetMapping("/")
	    public ResponseEntity<List<UserDto>> getAllUsers(@RequestHeader("Authorization") String authorizationHeader) {
		 String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
		 System.out.println(userService.getclaimsfromtoken(token).get("userType"));
		 List<UserDto> users = userService.getUser();
	        return new ResponseEntity<>(users, HttpStatus.OK);
	    }

	 @PutMapping("/update/{id}")
	 public ResponseEntity<UserDto> updateUserById(@PathVariable("id") Integer userId, @Valid @RequestBody UserDto userDto) {
	     UserDto updatedUser = userService.updateUserById(userId, userDto);
	     return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	 }
	
	@DeleteMapping("/id/{id}")
	public ResponseEntity<String> getDeleteById(@PathVariable("id") Integer userId) {
	    userService.deleteUserById(userId);
	    return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") String email) {
	    UserDto userDto = userService.getUserByEmail(email);
	    return new ResponseEntity<>(userDto, HttpStatus.OK); // Return user details with 200 OK
	}	
	
	
	

}
