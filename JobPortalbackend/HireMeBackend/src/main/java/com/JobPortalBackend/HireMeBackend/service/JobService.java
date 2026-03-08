package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.ApplicantDTO;
import com.JobPortalBackend.HireMeBackend.dto.JobDTO;
import com.JobPortalBackend.HireMeBackend.dto.ResponseDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException;

    public List<JobDTO> getAllJobs() throws JobPortalException;

    public JobDTO getJob(Long id) throws JobPortalException;

    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException;
}
