package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByRollNumber(String rollNumber);

    Optional<Student> findByRollNumber(String rollNumber);

    Optional<Student> findByUser(User user);
}
