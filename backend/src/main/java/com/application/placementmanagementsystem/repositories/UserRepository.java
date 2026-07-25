package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByRole(RoleType role);

    boolean existsByEmailAndIdNot(String email, Long id);

    Optional<User> findByIdAndRole(Long id, RoleType role);

    List<User> findAllByRole(RoleType role);
}