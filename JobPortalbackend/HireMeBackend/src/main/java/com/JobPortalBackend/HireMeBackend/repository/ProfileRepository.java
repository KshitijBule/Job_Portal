package com.JobPortalBackend.HireMeBackend.repository;

import com.JobPortalBackend.HireMeBackend.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends MongoRepository<Profile,Long> {
}
