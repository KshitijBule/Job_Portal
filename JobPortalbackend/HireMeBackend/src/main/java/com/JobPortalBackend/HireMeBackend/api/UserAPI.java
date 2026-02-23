package com.JobPortalBackend.HireMeBackend.api;

import com.JobPortalBackend.HireMeBackend.dto.LoginDTO;
import com.JobPortalBackend.HireMeBackend.dto.UserDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/users")
public class UserAPI {
    @Autowired
    private UserService userService;

    // register ka route
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobPortalException {
        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    // login ka route
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        return new ResponseEntity<>(userService.loginUser(loginDTO), HttpStatus.OK);
    }

}
