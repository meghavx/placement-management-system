package com.application.placementmanagementsystem.auth;

import com.application.placementmanagementsystem.auth.dtos.*;
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
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {
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

    @PatchMapping("/change-password")
    @Operation(summary = "Change Password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        authService.changePassword(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Password changed successfully"
                )
        );
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request Password Reset")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request
    ) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "If an account exists for this email, a password reset link has been sent."
                )
        );
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset Password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request
    ) {
        authService.resetPassword(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Password reset successfully"
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
