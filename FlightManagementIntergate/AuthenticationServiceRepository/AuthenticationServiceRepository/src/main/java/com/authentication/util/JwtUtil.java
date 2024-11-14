package com.authentication.util;


import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	
    // Decode the Base64 secret key
    
	String base64SecretKey = "q5kljQ6zV5L0m4b2j8qE6D3h9U2eC8jV1m3hT4oF0wY=";

    // Decode the Base64 secret key
    byte[] decodedKey = Base64.getDecoder().decode(base64SecretKey);
    
    SecretKey secretKey = new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName());

	
	private final long EXPIRATION_TIME = 3600000;
	
	public String generateToken(String username,String userType) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("userType",userType);
		
		return createToken(claims, username);
	}
	public String generateToken(String username,int otp) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("otp",otp);
		
		return createToken(claims, username);
	}
	
	private String createToken(Map<String,Object> claims, String subject) {
		try {
			return Jwts.builder()
					.setClaims(claims)
					.setSubject(subject)
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
					.signWith(secretKey,SignatureAlgorithm.HS256)
					.compact();
		}catch(Exception e) {
			System.out.println(e);
		}
		return null;
		
	}
	
	public boolean validateToken(String token,String username) {
		String extractedUsername = extractUsername(token);
		return (extractedUsername.equals(username)&& !isTokenExpired(token));
		
		
	}
	
	public String extractUsername(String token) {
		return extractAllClaims(token).getSubject();
	}

	public Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}
	private boolean isTokenExpired(String token) {
		return extractAllClaims(token).getExpiration().before(new Date());
	}
}
