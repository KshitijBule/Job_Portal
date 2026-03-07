package com.JobPortalBackend.HireMeBackend.api;


import com.JobPortalBackend.HireMeBackend.dto.JobDTO;
import com.JobPortalBackend.HireMeBackend.dto.UserDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/jobs")
public class JobAPI {
    @Autowired
    private JobService jobService;

    @PostMapping("/post")
    public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws JobPortalException {

        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() throws JobPortalException{
        return new ResponseEntity<>(jobService.getAllJobs(),HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable Long id) throws JobPortalException{
        return new ResponseEntity<>(jobService.getJob(id),HttpStatus.OK);
    }
}
