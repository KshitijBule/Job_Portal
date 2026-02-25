package com.JobPortalBackend.HireMeBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HireMeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HireMeBackendApplication.class, args);
	}

}
