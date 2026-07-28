package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Notification;
import com.application.placementmanagementsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    Optional<Notification> findByIdAndUser(
            Long id,
            User user
    );
}
