package com.application.placementmanagementsystem.dtos.notification;

import com.application.placementmanagementsystem.models.enums.NotificationType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NotificationResponse(

        Long id,

        NotificationType type,

        String title,

        String message,

        boolean read,

        LocalDateTime createdAt

) {}