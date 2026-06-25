package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.CurrentUserResponse;
import com.application.placementmanagementsystem.auth.dtos.LoginRequest;
import com.application.placementmanagementsystem.auth.dtos.LoginResponse;
import com.application.placementmanagementsystem.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(
                ApiResponse.<LoginResponse>builder()
                        .success(true)
                        .message("Login successful")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> getCurrentUser() {
        CurrentUserResponse response = authService.getCurrentUser();
        return ResponseEntity.ok(
                ApiResponse.<CurrentUserResponse>builder()
                        .success(true)
                        .message("Current user fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        authService.logout();
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Logout successful")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}
