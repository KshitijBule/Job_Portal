package com.JobPortalBackend.HireMeBackend.api;

import com.JobPortalBackend.HireMeBackend.dto.ResponseDTO;
import com.JobPortalBackend.HireMeBackend.entity.Notification;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import com.JobPortalBackend.HireMeBackend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/notification")
public class NotificationAPI {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId){
        return new ResponseEntity<>(notificationService.getUnreadNotifications(userId), HttpStatus.OK);
    }
    @PutMapping("/read/{id}")
    public ResponseEntity<ResponseDTO> readNotifications(@PathVariable Long id) throws JobPortalException {
        notificationService.readNotifications(id);
        return new ResponseEntity<>(new ResponseDTO("Success"), HttpStatus.OK);
    }
}
