package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
    Optional<Recruiter> findByUser(User user);
}

