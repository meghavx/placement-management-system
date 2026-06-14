package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
