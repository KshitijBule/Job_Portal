package com.JobPortalBackend.HireMeBackend.api;

import com.JobPortalBackend.HireMeBackend.dto.LoginDTO;
import com.JobPortalBackend.HireMeBackend.dto.ResponseDTO;
import com.JobPortalBackend.HireMeBackend.dto.UserDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.jwt.AuthenticationResponse;
import com.JobPortalBackend.HireMeBackend.jwt.JwtHelper;
import com.JobPortalBackend.HireMeBackend.jwt.MyUserDetailsService;
import com.JobPortalBackend.HireMeBackend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/users")
public class UserAPI {
    @Autowired
    private UserService userService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    // register ka route
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobPortalException {
        userDTO = userService.registerUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    // login ka route
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        // 1. validate credentials — throws if email not found or password wrong
        userService.loginUser(loginDTO);

        // 2. load full UserDetails
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(loginDTO.getEmail());

        // 3. generate JWT with id, name, accountType, profileId in claims
        String token = JwtHelper.generateToken(userDetails);

        // 4. return JWT
        return new ResponseEntity<>(new AuthenticationResponse(token), HttpStatus.OK);
    }

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message="{user.email.invalid}")String email) throws Exception {
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDTO("OTP sent successfully"), HttpStatus.OK);
    }

    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message="{user.email.invalid}") String email,@PathVariable @Pattern(regexp="^[0-9]{6}$" ,message="{otp.invalid}") String otp) throws JobPortalException {
        userService.verifyOtp(email,otp);
        return new ResponseEntity<>(new ResponseDTO("OTP verified"), HttpStatus.OK);
    }


    @PostMapping("/changePass")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
    }
}
