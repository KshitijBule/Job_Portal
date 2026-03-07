package com.JobPortalBackend.HireMeBackend.repository;

import com.JobPortalBackend.HireMeBackend.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JobRepository extends MongoRepository<Job,Long> {
}
