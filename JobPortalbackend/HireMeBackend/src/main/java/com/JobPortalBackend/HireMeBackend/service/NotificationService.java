package com.JobPortalBackend.HireMeBackend.service;

import com.JobPortalBackend.HireMeBackend.dto.NotificationDTO;
import com.JobPortalBackend.HireMeBackend.entity.Notification;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import org.springframework.stereotype.Service;

import java.util.List;


public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;
    public List<Notification> getUnreadNotifications(Long userId);

    public void readNotifications(Long id) throws JobPortalException;
}
