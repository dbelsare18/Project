package com.userservice.service.Impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;

import com.userservice.dto.UserDto;
import com.userservice.entities.UserEntity;
import com.userservice.exception.UserNotFoundException;
import com.userservice.repository.UserRepository;
import com.userservice.service.UserService;

import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserRepository userRepository;

	String base64SecretKey = "q5kljQ6zV5L0m4b2j8qE6D3h9U2eC8jV1m3hT4oF0wY=";

    // Decode the Base64 secret key
    byte[] decodedKey = Base64.getDecoder().decode(base64SecretKey);
    
	private static final String PHONE_REGEX = "^\\+?[0-9. ()-]{7,}$"; // Adjust as needed for your phone format

	@Override
	public UserDto addUser(UserDto userdto) {
		//validateUser(userdto);

		UserEntity userEntity = buildUserEntityFromUserDto(userdto);

		UserEntity newUser = userRepository.save(userEntity);

		UserDto newDto = buildUserDtoFromUserEntity(newUser);
		return newDto;

	}

	public UserEntity buildUserEntityFromUserDto(UserDto userdto) {
		UserEntity user = new UserEntity();
		
		user.setFirstName(userdto.getFirstName());
		user.setLastName(userdto.getLastName());
		user.setGender(userdto.getGender());
		user.setAge(userdto.getAge());
		user.setEmail(userdto.getEmail());
		user.setUserPhone(userdto.getUserPhone());
		
		return user;
	}

	public UserDto buildUserDtoFromUserEntity(UserEntity userEntity) {
		UserDto user = new UserDto();
		user.setUserId(userEntity.getUserId());
		
		user.setFirstName(userEntity.getFirstName());
		user.setLastName(userEntity.getLastName());
		user.setGender(userEntity.getGender());
		user.setAge(userEntity.getAge());
		user.setEmail(userEntity.getEmail());
		
		user.setUserPhone(userEntity.getUserPhone());
		
		return user;
	}
	@Override
	public UserDto getUserById(Integer userId) throws UserNotFoundException {
	    Optional<UserEntity> optionalUser = userRepository.findById(userId);
	    
	    if (optionalUser.isEmpty()) {
	        throw new UserNotFoundException("User not found with id: " + userId);
	    }

	    UserEntity userEntity = optionalUser.get();
	    return buildUserDtoFromUserEntity(userEntity); // Convert to DTO before returning
	}

	 @Override
	    public List<UserDto> getUser() {
	        List<UserEntity> userEntities = userRepository.findAll();
	        List<UserDto> userDtos = new ArrayList<>();
	        
	        for (UserEntity userEntity : userEntities) {
	            userDtos.add(buildUserDtoFromUserEntity(userEntity));
	        }

	        return userDtos;
	    }


	 @Override
	 public UserDto updateUserById(Integer userId, UserDto userDto) throws UserNotFoundException {
	    // validateUser(userDto); // Ensure the userDto is valid
	     Optional<UserEntity> optionalUser = userRepository.findById(userId);
	     
	     if (optionalUser.isEmpty()) {
	         throw new UserNotFoundException("User not registered with this ID: " + userId);
	     }
	     
	     UserEntity existingUser = optionalUser.get();

	     // Update fields
	     existingUser.setUserPhone(userDto.getUserPhone());
	     existingUser.setEmail(userDto.getEmail());
	     existingUser.setFirstName(userDto.getFirstName());
	     existingUser.setLastName(userDto.getLastName());
	     existingUser.setGender(userDto.getGender());
	     existingUser.setAge(userDto.getAge());


	     // Save the updated entity
	     UserEntity updatedUser = userRepository.save(existingUser);

	     return buildUserDtoFromUserEntity(updatedUser); // Convert back to UserDto
	 }


	 @Override
	    public void deleteUserById(Integer userId) throws UserNotFoundException {
	        Optional<UserEntity> optionalUser = userRepository.findById(userId);
	        if (optionalUser.isEmpty()) {
	            throw new UserNotFoundException("User not found with id: " + userId);
	        }
	        
	        userRepository.deleteById(userId); // Delete the user by ID
	    }
//	@Override
//	public void validateUser(UserDto userdto) {
//
//		if (userdto.getPassword() == null || userdto.getPassword().length() < 6) {
//			throw new IllegalArgumentException("Password must be at least 6 characters long.");
//		}
//
//		// Ensure userPhone is a String and validate it
//		String phoneString = userdto.getUserPhone() != null ? userdto.getUserPhone().toString() : null;
//
//		// Validate userPhone as a String
////		if (phoneString == null || !Pattern.matches(PHONE_REGEX, phoneString)) {
////			throw new IllegalArgumentException("Invalid phone number.");
////		}
//
//	}

	@Override
	public Map<String,Object> getclaimsfromtoken(String token){
		
		JwtDecoder jwtdecoder= NimbusJwtDecoder.withSecretKey(new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName())).build() ;
		Jwt jwt=jwtdecoder.decode(token);
		return jwt.getClaims();
		
	}
	
	@Override
	public UserDto getUserByEmail(String email) throws UserNotFoundException {
	    Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
	    if (optionalUser.isEmpty()) {
	        return null;
	    }
 
	    UserEntity userEntity = optionalUser.get();
	    return buildUserDtoFromUserEntity(userEntity); // Convert to DTO before returning
	}

	
	
}
