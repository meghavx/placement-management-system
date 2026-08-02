package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.placementadmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementadmin.UpdatePlacementAdminRequest;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlacementAdminMapper {
    private final PasswordEncoder passwordEncoder;

    public PlacementAdminResponse toResponse(User user) {
        return PlacementAdminResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .active(user.isActive())
                .build();
    }

    public User toEntity(CreatePlacementAdminRequest request) {
        return User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .phoneNumber(request.phoneNumber())
                .role(RoleType.PLACEMENT_ADMIN)
                .active(true)
                .build();
    }

    public void updateEntity(UpdatePlacementAdminRequest request, User user) {
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPhoneNumber(request.phoneNumber());
    }
}
