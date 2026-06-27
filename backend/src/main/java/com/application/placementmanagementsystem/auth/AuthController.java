package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.CurrentUserResponse;
import com.application.placementmanagementsystem.auth.dtos.LoginRequest;
import com.application.placementmanagementsystem.auth.dtos.LoginResponse;
import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication and Authorization")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login")
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
    @Operation(summary = "Get Current User Details")
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
    @Operation(summary = "Logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        authService.logout();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Logout successful"
                )
        );
    }
}
