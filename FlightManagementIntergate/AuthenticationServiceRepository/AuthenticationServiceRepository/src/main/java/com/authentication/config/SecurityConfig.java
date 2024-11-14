package com.authentication.config;

import java.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import com.authentication.service.CustomUserDetailsService;

import io.jsonwebtoken.SignatureAlgorithm;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private CustomUserDetailsService userDetailsService;

	String base64SecretKey = "q5kljQ6zV5L0m4b2j8qE6D3h9U2eC8jV1m3hT4oF0wY=";

	// Decode the Base64 secret key
	byte[] decodedKey = Base64.getDecoder().decode(base64SecretKey);

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
				.authorizeHttpRequests(authz -> authz.requestMatchers("/auth/register").permitAll()
						.requestMatchers("/auth/login").permitAll().requestMatchers("/auth/forgotpassword").permitAll()

						.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/api/v1/auth/**",
								"/v3/api-docs.yaml",
								 "/swagger-resources/**",
								 "/v2/api-docs",
								"/swagger-ui.html")
						.permitAll()
						
						.requestMatchers("/auth/verifyOtp").permitAll()
						.anyRequest().authenticated())
				.oauth2ResourceServer(
						oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));

		return http.build();
	}

	@Bean
	public JwtAuthenticationConverter jwtAuthenticationConverter() {

		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
		converter.setPrincipalClaimName(JwtClaimNames.SUB);
		return converter;

	}

	@Bean
	public JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withSecretKey(new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName()))
				.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // Create a PasswordEncoder bean
	}
}