package com.userservice.testService;

import java.math.BigInteger;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.userservice.dto.UserDto;
import com.userservice.entities.UserEntity;
import com.userservice.repository.UserRepository;
import com.userservice.service.UserService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;



public class UserTestService {
	
	@Mock
    private UserRepository userRepository; // Replace with your repository class name

    @InjectMocks
    private UserService userService; // Replace with your service class name

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addUser_ShouldReturnUserDto() {
        UserDto userDto = new UserDto();
        userDto.setFirstName("testuser");
        userDto.setEmail("test@example.com");
       
        userDto.setUserPhone(new BigInteger("1234567890"));
      

        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(1); // Assume an ID is generated
        userEntity.setFirstName("testuser");
        userEntity.setEmail("test@example.com");
        
        userEntity.setUserPhone(new BigInteger("1234567890"));
        

        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        UserDto savedUserDto = userService.addUser(userDto);

        assertEquals(userDto.getFirstName(), savedUserDto.getFirstName());
        assertEquals(userDto.getEmail(), savedUserDto.getEmail());
    }

}
