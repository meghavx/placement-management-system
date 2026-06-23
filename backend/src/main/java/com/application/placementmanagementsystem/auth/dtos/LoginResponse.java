package com.application.placementmanagementsystem.auth.dtos;

import com.application.placementmanagementsystem.models.enums.RoleType;

public record LoginResponse (
    Long id,
    String fullName,
    String email,
    RoleType role,
    String accessToken
) {}