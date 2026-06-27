package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.CurrentUserResponse;
import com.application.placementmanagementsystem.auth.dtos.LoginRequest;
import com.application.placementmanagementsystem.auth.dtos.LoginResponse;
import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Login successful",
                        response
                )
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> getCurrentUser() {
        CurrentUserResponse response = authService.getCurrentUser();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Current user fetched successfully",
                        response
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        authService.logout();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Logout successful"
                )
        );
    }
}
