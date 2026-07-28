package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.models.PasswordResetToken;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.repositories.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {

    private static final long TOKEN_EXPIRY_MINUTES = 30;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Transactional
    public String createToken(User user) {
        // Invalidate any previously issued reset links for this user
        passwordResetTokenRepository.deleteAllByUser(user);
        String rawToken = generateSecureToken();
        String tokenHash = hashToken(rawToken);
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .tokenHash(tokenHash)
                .expiresAt(LocalDateTime.now().plusMinutes(TOKEN_EXPIRY_MINUTES))
                .used(false)
                .user(user)
                .build();
        passwordResetTokenRepository.save(resetToken);
        return rawToken;
    }

    public PasswordResetToken validateToken(String rawToken) {
        String tokenHash = hashToken(rawToken);
        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenHash(tokenHash)
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid or expired password reset link.")
                );
        if (resetToken.isUsed()) {
            throw new IllegalArgumentException("Password reset link has already been used.");
        }
        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Password reset link has expired.");
        }
        return resetToken;
    }

    public void markTokenAsUsed(PasswordResetToken resetToken) {
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }

    private String generateSecureToken() {
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 algorithm is unavailable.", ex);
        }
    }
}