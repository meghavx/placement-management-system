package com.application.placementmanagementsystem.services.notification;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.notification.NotificationResponse;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.NotificationMapper;
import com.application.placementmanagementsystem.models.Notification;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.NotificationType;
import com.application.placementmanagementsystem.repositories.NotificationRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationResponse> getMyNotifications() {

        User user = getAuthenticatedUser();

        List<Notification> notifications =
                notificationRepository.findByUserOrderByCreatedAtDesc(user);

        return notificationMapper.toResponseList(notifications);
    }

    @Transactional
    @Override
    public NotificationResponse markAsRead(Long notificationId) {

        User user = getAuthenticatedUser();

        Notification notification =
                notificationRepository
                        .findByIdAndUser(notificationId, user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found."
                                ));

        notification.setRead(true);

        Notification updatedNotification =
                notificationRepository.save(notification);

        return notificationMapper.toResponse(updatedNotification);
    }

    @Transactional
    @Override
    public void createNotification(
            User user,
            NotificationType type,
            String title,
            String message
    ) {

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .read(false)
                .build();

        notificationRepository.save(notification);
    }

    private User getAuthenticatedUser() {

        CustomUserPrincipal principal =
                (CustomUserPrincipal) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }
}