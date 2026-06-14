package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
