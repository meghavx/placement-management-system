package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Resume;
import com.application.placementmanagementsystem.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByStudent(Student student);

    boolean existsByStudent(Student student);
}
