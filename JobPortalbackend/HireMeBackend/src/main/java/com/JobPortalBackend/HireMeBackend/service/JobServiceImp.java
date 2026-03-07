package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.JobDTO;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.repository.JobRepository;
import com.JobPortalBackend.HireMeBackend.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("jobService")
public class JobServiceImp implements JobService{
    @Autowired
    private JobRepository jobRepository;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        jobDTO.setId(Utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() throws JobPortalException {
        return jobRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND")).toDTO();
    }
}
