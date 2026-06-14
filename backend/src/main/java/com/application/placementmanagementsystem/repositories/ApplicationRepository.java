package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
