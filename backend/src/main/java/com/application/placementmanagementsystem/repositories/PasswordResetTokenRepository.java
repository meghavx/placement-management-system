package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.PasswordResetToken;
import com.application.placementmanagementsystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    void deleteAllByUser(User user);
}