package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.LoginDTO;
import com.JobPortalBackend.HireMeBackend.dto.UserDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import jakarta.validation.Valid;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;


    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;
}
