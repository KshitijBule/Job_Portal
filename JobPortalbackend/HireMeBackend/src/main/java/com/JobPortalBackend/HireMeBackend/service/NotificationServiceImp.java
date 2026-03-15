package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.NotificationDTO;
import com.JobPortalBackend.HireMeBackend.dto.NotificationStatus;
import com.JobPortalBackend.HireMeBackend.entity.Notification;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.repository.NotificationRepository;
import com.JobPortalBackend.HireMeBackend.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImp implements NotificationService{
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimeStamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotifications(Long id) throws JobPortalException{
        Notification noti = notificationRepository.findById(id).orElseThrow(()->new JobPortalException("No notification found"));
        noti.setStatus(NotificationStatus.READ);
        notificationRepository.save(noti);
    }
}
