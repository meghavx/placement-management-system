package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}
