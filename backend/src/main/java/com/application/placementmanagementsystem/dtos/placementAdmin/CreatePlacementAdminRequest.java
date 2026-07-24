package com.application.placementmanagementsystem.dtos.placementAdmin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreatePlacementAdminRequest(
        @NotBlank(message = "Placement admin name is required")
        @Size(max = 100, message = "Maximum length of full name not exceed 30")
        String fullName,

        @NotBlank(message = "Placement admin email is required")
        @Email(message = "Email should be valid")
        String email,

        @NotBlank(message = "Phone number is required")
        @Pattern(
                regexp = "^[6-9]\\d{9}$",
                message = "Phone number must be a valid 10-digit Indian mobile number."
        )
        String phoneNumber,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 100, message = "Password length must be between 8 and 100")
        String password
) {}
