package com.authentication.service;

import java.net.InetAddress;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.authentication.entities.LoginRequest;
import com.authentication.entities.UserAuthEntity;
import com.authentication.exception.InvalidUserName;
import com.authentication.exception.UserNotFoundException;
import com.authentication.repository.UserAuthRepository;
import com.authentication.util.JwtUtil;

@Service
public class UserAuthService {

	private UserAuthRepository userAuthRepository;

	private final PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private JwtUtil jwtUtil;

	private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

	private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

	public UserAuthService(UserAuthRepository userAuthRepository, PasswordEncoder passwordEncoder) {

		this.userAuthRepository = userAuthRepository;
		this.passwordEncoder = passwordEncoder;

	}

	private boolean checkEmail(String email) {
		if (email == null || email.isEmpty()) {
			return false; // null or empty string is not valid
		}

		// Check email format
		if (!EMAIL_PATTERN.matcher(email).matches()) {
			return false;
		}

		// Extract the domain from the email
		String domain = email.substring(email.indexOf('@') + 1);

		// Check if the domain has valid DNS records
		return domainExists(domain);
	}

	private static boolean domainExists(String domain) {
		try {
			InetAddress.getByName(domain);
			return true; // Domain exists
		} catch (Exception e) {
			return false; // Domain does not exist
		}
	}

	public boolean save(UserAuthEntity user) {

		if (checkEmail(user.getUsername())) {

			Optional<UserAuthEntity> entity = userAuthRepository.findByUsername(user.getUsername());

			if (entity.isEmpty()) {

				user.setPassword(passwordEncoder.encode(user.getPassword()));
				user.setUserType(ObjectUtils.isEmpty(user.getUserType()) ? "customer" : user.getUserType());
				userAuthRepository.save(user);
				return true;
			} else {

				throw new UserNotFoundException("User already present");
			}
		} else {
			throw new InvalidUserName("user name is invalid");
		}

	}

	public String authenticate(LoginRequest loginRequest) {

		if (checkEmail(loginRequest.getUsername())) {
			UserAuthEntity user = userAuthRepository.findByUsername(loginRequest.getUsername())
					.orElseThrow(() -> new RuntimeException("User not Found"));
			if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
				return jwtUtil.generateToken(user.getUsername(), user.getUserType());
			} else {
				throw new RuntimeException("Invalid creadentials");
			}
		} else {
			throw new InvalidUserName("user name is invalid");
		}

	}

	public boolean sendOtp(String username) {
		if (checkEmail(username)) {
			return generateOtpMail(username);
		} else {
			throw new InvalidUserName("user name is invalid");
		}

	}

	private boolean generateOtpMail(String username) {

		int otp = generateRandomNumber();
		Optional<UserAuthEntity> user = userAuthRepository.findByUsername(username);
		if (user.isPresent()) {
			SimpleMailMessage message = new SimpleMailMessage();

			message.setTo(username);
			message.setSubject("Email Verification for Flight Management System");
			message.setText("Please use below otp from verification to flight management system<br><br>" + otp
					+ " This Otp valid will be 10 sec only");
			javaMailSender.send(message);

			UserAuthEntity entity = user.get();
			entity.setOtp(otp);
			entity.setGeneratedAt(LocalDateTime.now());

			userAuthRepository.save(entity);

			return true;

		}

		return false;
	}

	private int generateRandomNumber() {
		Random random = new Random();
		return 1000 + random.nextInt(9000); // Generates a number from 1000 to 9999
	}

	public String verifyOtp(String username, int otp) {

		LocalDateTime t = LocalDateTime.now();
		if (checkEmail(username)) {

			Optional<UserAuthEntity> entity = userAuthRepository.findByUsername(username);

			if (entity.isEmpty()) {
				throw new InvalidUserName("user name is invalid");
			} else {
				UserAuthEntity user = entity.get();
				if (user.getOtp() == otp && ChronoUnit.SECONDS.between(t, user.getGeneratedAt()) <= 60) {
					return jwtUtil.generateToken(username, otp);
				} else {
					throw new RuntimeException("Otp is invalid");
				}
			}
		} else {
			throw new InvalidUserName("user name is invalid");
		}

	}

	public boolean updatePassword(UserAuthEntity user) {
		if (checkEmail(user.getUsername())) {

			Optional<UserAuthEntity> entity = userAuthRepository.findByUsername(user.getUsername());
			if (entity.isEmpty()) {
				throw new InvalidUserName("user name is invalid");

			} else {
				UserAuthEntity userEntity = entity.get();
				userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
				userAuthRepository.save(userEntity);
				return true;
			}

		} else {
			throw new InvalidUserName("user name is invalid");
		}

	}

}
