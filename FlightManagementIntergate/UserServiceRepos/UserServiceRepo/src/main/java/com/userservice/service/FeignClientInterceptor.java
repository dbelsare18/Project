package com.userservice.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

	@Override
	public void apply(RequestTemplate template) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		Object credentials = authentication.getCredentials();
		
		String accessToken="";
		
		if (credentials instanceof Jwt) {
           accessToken=  ((Jwt) credentials).getTokenValue();
        }
		

		template.header("Authorization", "Bearer " + accessToken);
	}
}