package com.application.placementmanagementsystem.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = "Reset token is required.")
        String token,

        @NotBlank(message = "New password is required.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,100}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
        )
        String newPassword
) {}