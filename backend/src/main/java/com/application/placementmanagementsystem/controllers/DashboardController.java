package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.dashboard.PlacementAdminDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.RecruiterDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.StudentDashboardResponse;
import com.application.placementmanagementsystem.services.dashboard.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/student/dashboard")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Student Dashboard")
    public ResponseEntity<ApiResponse<StudentDashboardResponse>> getStudentDashboard() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student dashboard fetched successfully.",
                        dashboardService.getStudentDashboard()
                )
        );
    }

    @GetMapping("/recruiter/dashboard")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Recruiter Dashboard")
    public ResponseEntity<ApiResponse<RecruiterDashboardResponse>> getRecruiterDashboard() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter dashboard fetched successfully.",
                        dashboardService.getRecruiterDashboard()
                )
        );
    }

    @GetMapping("/placement-admin/dashboard")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    @Operation(summary = "Placement Admin Dashboard")
    public ResponseEntity<ApiResponse<PlacementAdminDashboardResponse>> getPlacementAdminDashboard() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement admin dashboard fetched successfully.",
                        dashboardService.getPlacementAdminDashboard()
                )
        );
    }
}