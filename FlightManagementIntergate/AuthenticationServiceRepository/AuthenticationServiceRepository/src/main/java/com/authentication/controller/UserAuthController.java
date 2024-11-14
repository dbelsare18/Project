package com.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authentication.dto.VerifyOtpDto;
import com.authentication.dto.userAuthDto;
import com.authentication.entities.LoginRequest;
import com.authentication.entities.UserAuthEntity;
import com.authentication.service.UserAuthService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserAuthController {

	@Autowired
	private UserAuthService authService;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody UserAuthEntity user) {
		try {

			if (authService.save(user)) {
				return new ResponseEntity<String>("user is succesfully added", HttpStatus.CREATED);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return null;

	}

	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest request) {
		try {

			String token = authService.authenticate(request);
			return new ResponseEntity<String>(token, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/forgotpassword")
	public ResponseEntity<String> forgetPassword(@RequestBody userAuthDto userauthdto) {
		try {
			if (authService.sendOtp(userauthdto.getUsername())) {
				return new ResponseEntity<String>("Email send with the otp", HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);

		}
		return null;

	}
	
	@PostMapping("/verifyOtp")
	public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpDto verifyOtpDto){
		try {
			

				return new ResponseEntity<String>(authService.verifyOtp(verifyOtpDto.getUsername(),verifyOtpDto.getOtp()),HttpStatus.OK);
			
			
		}catch(Exception e)
		{
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
			
		}
		
	}
	
	 @PostMapping("/resetPassword")
	 public ResponseEntity<String> resetpassword(@RequestBody UserAuthEntity user) {
	   
		
		 try
		 {
		 if(authService.updatePassword(user))
	    {
	    	return new ResponseEntity<String>("Password Updated Successfully",HttpStatus.OK);
	    	
	    }
		 }catch(Exception e) {
			 return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
	     
	 }
		 return null;
	

}
}
