package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.notification.NotificationResponse;
import com.application.placementmanagementsystem.models.Notification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }

    public List<NotificationResponse> toResponseList(
            List<Notification> notifications
    ) {
        return notifications.stream()
                .map(this::toResponse)
                .toList();
    }
}
