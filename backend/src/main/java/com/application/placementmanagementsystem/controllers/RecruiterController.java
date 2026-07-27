package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterCreateRequest;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterUpdateRequest;
import com.application.placementmanagementsystem.services.recruiter.RecruiterService;
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
@RequestMapping("/api/recruiters")
@PreAuthorize("hasRole('PLACEMENT_ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Recruiter Management")
public class RecruiterController {
    
    private final RecruiterService recruiterService;

    @PostMapping
    @Operation(summary = "Add Recruiter")
    public ResponseEntity<ApiResponse<RecruiterResponse>> createRecruiter(
            @Valid @RequestBody RecruiterCreateRequest request
    ) {
        RecruiterResponse response = recruiterService.createRecruiter(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseBuilder.success(
                        "Recruiter created successfully",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Recruiter")
    public ResponseEntity<ApiResponse<RecruiterResponse>> updateRecruiter(
            @PathVariable Long id,
            @Valid @RequestBody RecruiterUpdateRequest request
    ) {
        RecruiterResponse response = recruiterService.updateRecruiter(id, request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter updated successfully",
                        response
                )
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Activate/Deactivate Recruiter")
    public ResponseEntity<ApiResponse<RecruiterResponse>> updateRecruiterStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        RecruiterResponse response = recruiterService.updateRecruiterStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter " + statusMessage + " successfully",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Recruiter by ID")
    public ResponseEntity<ApiResponse<RecruiterResponse>> getRecruiterById(
            @PathVariable Long id
    ) {
        RecruiterResponse response = recruiterService.getRecruiterById(id);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter fetched successfully",
                        response
                )
        );
    }

    @GetMapping
    @Operation(summary = "Get All Recruiters")
    public ResponseEntity<ApiResponse<List<RecruiterResponse>>> getAllRecruiters() {
        List<RecruiterResponse> response = recruiterService.getAllRecruiters();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiters fetched successfully",
                        response
                )
        );
    }
}
