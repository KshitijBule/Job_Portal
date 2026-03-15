package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.*;
import com.JobPortalBackend.HireMeBackend.entity.Applicant;
import com.JobPortalBackend.HireMeBackend.entity.Job;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.repository.JobRepository;
import com.JobPortalBackend.HireMeBackend.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service("jobService")
public class JobServiceImp implements JobService{
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if (jobDTO.getId() == 0) {
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
        }
        else {
            Job job = jobRepository.findById(jobDTO.getId())
                    .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
                // agar draft pe tha to jab post hua uska post time update krne k liye
            if (job.getJobStatus().equals(JobStatus.DRAFT)
                    || jobDTO.getJobStatus().equals(JobStatus.CLOSED)) {
                jobDTO.setPostTime(LocalDateTime.now());
            }
        }

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


    // dikkat ho skti hai
    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) {
            applicants = new ArrayList<>();
        }

        // check already applied
        if (applicants.stream()
                .anyMatch(x -> Objects.equals(x.getApplicantId(), applicantDTO.getApplicantId()))) {
            throw new JobPortalException("APPLICANT_ALREADY_APPLIED");
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicantDTO.setTimeStamp(LocalDateTime.now());

        if (applicantDTO.getApplicantId() == null) {
            throw new JobPortalException("APPLICANT_ID_REQUIRED");
        }

        Applicant applicant = applicantDTO.toEntity();


        applicant.setApplicantId(applicantDTO.getApplicantId());

        applicants.add(applicant);

        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) throws JobPortalException {
        return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public void changeAppStatus(Application applicantion) throws JobPortalException {
        Job job = jobRepository.findById(applicantion.getId())
                .orElseThrow(() -> new JobPortalException("APPLICANTION_NOT_FOUND"));

        List<Applicant> applicants = job.getApplicants().stream().map((x)->{
            if(applicantion.getApplicantId() == x.getApplicantId()){
                x.setApplicationStatus(applicantion.getApplicationStatus());
                if(applicantion.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)){
                    x.setInterviewTime(applicantion.getInterviewTime());
                    NotificationDTO notiDTO = new NotificationDTO();
                    notiDTO.setAction(("Interview Scheduled"));
                    notiDTO.setMessage("Interview Scheduled for job id"+ applicantion.getId());
                    notiDTO.setUserId(applicantion.getApplicantId());
                    notiDTO.setRoute("/job-history");
                    try {
                        notificationService.sendNotification(notiDTO);
                    } catch (JobPortalException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);
    }
}
