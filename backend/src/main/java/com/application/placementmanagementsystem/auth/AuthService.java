package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.ChangePasswordRequest;
import com.application.placementmanagementsystem.auth.dtos.CurrentUserResponse;
import com.application.placementmanagementsystem.auth.dtos.LoginRequest;
import com.application.placementmanagementsystem.auth.dtos.LoginResponse;
import com.application.placementmanagementsystem.auth.jwt.JwtService;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    private User getAuthenticatedUser() {
        CustomUserPrincipal principal =
                (CustomUserPrincipal) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository
                .findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (user.getRole() != request.role()) {
            throw new BadCredentialsException(("Invalid role selected"));
        }

        String accessToken = jwtService.generateAccessToken((user)).toString();

        return LoginResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(accessToken)
                .build();
    }

    public CurrentUserResponse getCurrentUser() {
        var principal = (CustomUserPrincipal) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return CurrentUserResponse.builder()
                .id(principal.getId())
                .fullName(principal.getFullName())
                .email(principal.getEmail())
                .role(principal.getRole())
                .build();
    }

    public void changePassword(ChangePasswordRequest request) {
        User user = getAuthenticatedUser();

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new BadCredentialsException(
                    "Current password is incorrect."
            );
        }
        if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
            throw new IllegalArgumentException(
                    "New password must be different from the current password."
            );
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    // Mostly symbolic in a stateless JWT setup since
    // the token itself remains valid until it expires.
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
