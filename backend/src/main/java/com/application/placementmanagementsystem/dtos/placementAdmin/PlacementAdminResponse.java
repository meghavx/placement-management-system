package com.application.placementmanagementsystem.dtos.placementAdmin;

import lombok.Builder;

@Builder
public record PlacementAdminResponse (
        Long id,
        String fullName,
        String email,
        String phoneNumber,
        boolean active
) {}
