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
    @Operation(summary = "Get my applications")
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
    @Operation(summary = "Get my application by ID")
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
    @Operation(summary = "Get applications for a placement drive")
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

    @PatchMapping("/recruiter/applications/{applicationId}/status")
    @PreAuthorize("hasRole('RECRUITER')")
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