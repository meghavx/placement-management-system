package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.application.ApplicationResponse;
import com.application.placementmanagementsystem.dtos.application.ApplicationStatusUpdateRequest;
import com.application.placementmanagementsystem.dtos.application.ApplicationSummaryResponse;
import com.application.placementmanagementsystem.services.application.ApplicationService;
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
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "Application Management")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/student/applications/{driveId}")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Apply for a placement drive")
    public ResponseEntity<ApiResponse<ApplicationResponse>> applyForDrive(
            @PathVariable Long driveId
    ) {

        ApplicationResponse response =
                applicationService.apply(driveId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ResponseBuilder.success(
                                "Application submitted successfully.",
                                response
                        )
                );
    }

    @GetMapping("/student/applications")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "For Student to get their applications")
    public ResponseEntity<ApiResponse<List<ApplicationSummaryResponse>>> getMyApplications() {

        List<ApplicationSummaryResponse> response =
                applicationService.getMyApplications();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Applications retrieved successfully.",
                        response
                )
        );
    }

    @GetMapping("/student/applications/{applicationId}")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "For Student to get their application by ID")
    public ResponseEntity<ApiResponse<ApplicationResponse>> getMyApplication(
            @PathVariable Long applicationId
    ) {

        ApplicationResponse response =
                applicationService.getMyApplication(applicationId);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Application retrieved successfully.",
                        response
                )
        );
    }

    @GetMapping("/recruiter/drives/{driveId}/applications")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "For Recruiter to get applications for their placement drive")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getApplicationsForDrive(
            @PathVariable Long driveId
    ) {

        List<ApplicationResponse> response =
                applicationService.getApplicationsForDrive(driveId);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Applications retrieved successfully.",
                        response
                )
        );
    }

    @GetMapping("/placement-admin/applications")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    @Operation(summary = "For Placement Admin to get all applications")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getAllApplications() {
        List<ApplicationResponse> response = applicationService.getAllApplications();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Applications retrieved successfully.",
                        response
                )
        );
    }

    @GetMapping("/placement-admin/applications/{applicationId}")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    @Operation(summary = "For Placement Admin to get application by ID")
    public ResponseEntity<ApiResponse<ApplicationResponse>> getApplicationById(
            @PathVariable Long applicationId
    ) {
        ApplicationResponse response = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Application retrieved successfully.",
                        response
                )
        );
    }

    @PatchMapping("/applications/{applicationId}/status")
    @PreAuthorize("hasAnyRole('RECRUITER', 'PLACEMENT_ADMIN')")
    @Operation(summary = "Update application status")
    public ResponseEntity<ApiResponse<ApplicationResponse>> updateApplicationStatus(
            @PathVariable Long applicationId,
            @Valid @RequestBody ApplicationStatusUpdateRequest request
    ) {

        ApplicationResponse response =
                applicationService.updateApplicationStatus(
                        applicationId,
                        request
                );

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Application status updated successfully.",
                        response
                )
        );
    }
}