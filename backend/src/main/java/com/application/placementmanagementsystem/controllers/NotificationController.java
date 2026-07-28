package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.notification.NotificationResponse;
import com.application.placementmanagementsystem.services.notification.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@Tag(name = "Notification Management")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get my notifications")
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getMyNotifications() {

        List<NotificationResponse> response =
                notificationService.getMyNotifications();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Notifications retrieved successfully.",
                        response
                )
        );
    }

    @PatchMapping("/{notificationId}/read")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Mark notification as read")
    public ResponseEntity<ApiResponse<NotificationResponse>> markAsRead(
            @PathVariable Long notificationId
    ) {

        NotificationResponse response =
                notificationService.markAsRead(notificationId);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Notification marked as read.",
                        response
                )
        );
    }
}