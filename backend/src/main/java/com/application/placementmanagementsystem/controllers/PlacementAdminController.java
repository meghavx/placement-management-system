package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.dtos.placementAdmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementAdmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementAdmin.UpdatePlacementAdminRequest;
import com.application.placementmanagementsystem.services.placementAdmin.PlacementAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/placement-admins")
@PreAuthorize("hasRole('SUPER_ADMIN')")
@RequiredArgsConstructor
public class PlacementAdminController {
    private final PlacementAdminService placementAdminService;

    @PostMapping
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> createPlacementAdmin(
            @Valid @RequestBody CreatePlacementAdminRequest request
    ) {
        PlacementAdminResponse response = placementAdminService.createPlacementAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<PlacementAdminResponse>builder()
                        .success(true)
                        .message("Placement Admin created successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> updatePlacementAdmin(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePlacementAdminRequest request
    ) {
        PlacementAdminResponse response = placementAdminService.updatePlacementAdmin(id, request);
        return ResponseEntity.ok(
                ApiResponse.<PlacementAdminResponse>builder()
                        .success(true)
                        .message("Placement Admin details updated")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> updatePlacementAdminStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        PlacementAdminResponse placementAdmin = placementAdminService.updatePlacementAdminStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ApiResponse.<PlacementAdminResponse>builder()
                        .success(true)
                        .message("Placement Admin " + statusMessage + " successfully")
                        .data(placementAdmin)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> getPlacementAdminById(@PathVariable Long id) {
        PlacementAdminResponse response = placementAdminService.getPlacementAdminById(id);
        return ResponseEntity.ok(
                ApiResponse.<PlacementAdminResponse>builder()
                        .success(true)
                        .message("Placement Admin fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlacementAdminResponse>>> getAllPlacementAdmins() {
        List<PlacementAdminResponse> response = placementAdminService.getAllPlacementAdmins();
        return ResponseEntity.ok(
                ApiResponse.<List<PlacementAdminResponse>>builder()
                        .success(true)
                        .message("Placement Admins fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}
