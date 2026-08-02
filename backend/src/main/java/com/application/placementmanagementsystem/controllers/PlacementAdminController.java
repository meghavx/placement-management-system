package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.placementadmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementadmin.UpdatePlacementAdminRequest;
import com.application.placementmanagementsystem.services.placementadmin.PlacementAdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/placement-admins")
@PreAuthorize("hasRole('SUPER_ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Placement Admin Management")
public class PlacementAdminController {
    private final PlacementAdminService placementAdminService;

    @PostMapping
    @Operation(summary = "Add Placement Admin")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> createPlacementAdmin(
            @Valid @RequestBody CreatePlacementAdminRequest request
    ) {
        PlacementAdminResponse response = placementAdminService.createPlacementAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseBuilder.success(
                        "Placement Admin created successfully",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Placement Admin")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> updatePlacementAdmin(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePlacementAdminRequest request
    ) {
        PlacementAdminResponse response = placementAdminService.updatePlacementAdmin(id, request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement Admin details updated",
                        response
                )
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Activate/Deactivate Placement Admin")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> updatePlacementAdminStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        PlacementAdminResponse response = placementAdminService.updatePlacementAdminStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement Admin " + statusMessage + " successfully",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Placement Admin by ID")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> getPlacementAdminById(
            @PathVariable Long id
    ) {
        PlacementAdminResponse response = placementAdminService.getPlacementAdminById(id);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement Admin fetched successfully",
                        response
                )
        );
    }

    @GetMapping
    @Operation(summary = "Get All Placement Admins")
    public ResponseEntity<ApiResponse<List<PlacementAdminResponse>>> getAllPlacementAdmins() {
        List<PlacementAdminResponse> response = placementAdminService.getAllPlacementAdmins();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement Admins fetched successfully",
                        response
                )
        );
    }
}
