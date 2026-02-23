package com.JobPortalBackend.HireMeBackend.repository;

import com.JobPortalBackend.HireMeBackend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {

}
