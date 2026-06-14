package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
