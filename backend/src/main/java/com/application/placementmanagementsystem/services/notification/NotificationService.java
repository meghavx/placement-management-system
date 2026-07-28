package com.application.placementmanagementsystem.services.notification;

import com.application.placementmanagementsystem.dtos.notification.NotificationResponse;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.NotificationType;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getMyNotifications();

    NotificationResponse markAsRead(Long notificationId);

    void createNotification(
            User user,
            NotificationType type,
            String title,
            String message
    );
}