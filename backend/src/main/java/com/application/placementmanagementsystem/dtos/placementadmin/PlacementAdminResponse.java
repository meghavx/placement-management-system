package com.application.placementmanagementsystem.dtos.placementadmin;

import lombok.Builder;

@Builder
public record PlacementAdminResponse (
        Long id,
        String fullName,
        String email,
        String phoneNumber,
        boolean active
) {}
