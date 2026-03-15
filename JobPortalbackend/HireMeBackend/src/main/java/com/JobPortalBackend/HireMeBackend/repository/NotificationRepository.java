package com.JobPortalBackend.HireMeBackend.repository;

import com.JobPortalBackend.HireMeBackend.dto.NotificationStatus;
import com.JobPortalBackend.HireMeBackend.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, Long> {
    public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);

}
