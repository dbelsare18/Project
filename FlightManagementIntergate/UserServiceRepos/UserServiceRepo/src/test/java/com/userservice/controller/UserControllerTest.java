package com.userservice.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigInteger;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.userservice.dto.UserDto;
import com.userservice.service.UserService;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)

@WebMvcTest(UserController.class) 
public class UserControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService; // Replace with your service class name

    @InjectMocks
    private UserController userController; // Replace with your controller class name

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
    }

    @Test
    void addUser_ShouldReturnCreatedUser() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setFirstName("testuser");
        userDto.setEmail("test@example.com");
        userDto.setUserPhone(new BigInteger("1234567890"));
        

        UserDto savedUserDto = new UserDto();
        savedUserDto.setUserId(1); // Assume an ID is generated
        savedUserDto.setFirstName("testuser");
        savedUserDto.setEmail("test@example.com");
        
        savedUserDto.setUserPhone(new BigInteger("1234567890"));
      

        when(userService.addUser(any(UserDto.class))).thenReturn(savedUserDto);

        mockMvc.perform(post("/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

}
