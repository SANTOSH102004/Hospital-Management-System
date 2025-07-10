package com.hospital.management.service;

import com.hospital.management.model.Notification;
import com.hospital.management.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(Long id, Notification updatedNotification) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setUser(updatedNotification.getUser());
            notification.setMessage(updatedNotification.getMessage());
            notification.setType(updatedNotification.getType());
            notification.setRead(updatedNotification.isRead());
            notification.setCreatedAt(updatedNotification.getCreatedAt());
            return notificationRepository.save(notification);
        }).orElse(null);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
} 