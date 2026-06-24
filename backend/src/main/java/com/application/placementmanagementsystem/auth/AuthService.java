package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.CurrentUserResponse;
import com.application.placementmanagementsystem.auth.dtos.LoginRequest;
import com.application.placementmanagementsystem.auth.dtos.LoginResponse;
import com.application.placementmanagementsystem.auth.jwt.JwtService;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

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

    public void logout() {
        /*
         * JWT authentication is stateless so the server does not maintain any session
         * information. Clearing the SecurityContext affects only the current request.
         *
         * So, logout is effectively handled on the client-side by removing the stored token.
         */
        SecurityContextHolder.clearContext();
    }
}
