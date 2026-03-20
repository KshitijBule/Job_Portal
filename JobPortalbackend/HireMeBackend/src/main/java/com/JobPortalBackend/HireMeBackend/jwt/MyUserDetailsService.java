package com.JobPortalBackend.HireMeBackend.jwt;

import com.JobPortalBackend.HireMeBackend.dto.UserDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO dto = userService.getUserByEmail(email);
            return new CustomUserDetails(dto.getId(), dto.getEmail(), dto.getName(), dto.getPassword(), dto.getProfileId(), dto.getAccountType(), new ArrayList<>());
        } catch (JobPortalException e) {
            throw new RuntimeException(e);
        }

    }
}
