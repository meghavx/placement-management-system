package com.application.placementmanagementsystem.auth.dtos;

import com.application.placementmanagementsystem.models.enums.RoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest (
    @Email
    @NotBlank(message = "Email is required")
    String email,

    @NotBlank(message = "Password is required")
    String password,

    @NotBlank(message = "Role is required")
    RoleType role
) {}