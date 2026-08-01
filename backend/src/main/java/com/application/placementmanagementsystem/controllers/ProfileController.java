package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.profile.PlacementAdminProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.profile.RecruiterProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.profile.StudentProfileUpdateRequest;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;
import com.application.placementmanagementsystem.services.profile.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "Profile Management")
public class ProfileController {

    private final ProfileService profileService;

    // Student Profile
    @GetMapping("/student/profile")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Get Current Student Profile")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentProfile() {
        StudentResponse response = profileService.getStudentProfile();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student profile fetched successfully",
                        response
                )
        );
    }

    @PutMapping("/student/profile")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Update Current Student Profile")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudentProfile(
            @Valid @RequestBody StudentProfileUpdateRequest request
    ) {
        StudentResponse response = profileService.updateStudentProfile(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student profile updated successfully",
                        response
                )
        );
    }

    // Recruiter Profile
    @GetMapping("/recruiter/profile")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Get Current Recruiter Profile")
    public ResponseEntity<ApiResponse<RecruiterResponse>> getRecruiterProfile() {
        RecruiterResponse response = profileService.getRecruiterProfile();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter profile fetched successfully",
                        response
                )
        );
    }

    @PutMapping("/recruiter/profile")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Update Current Recruiter Profile")
    public ResponseEntity<ApiResponse<RecruiterResponse>> updateRecruiterProfile(
            @Valid @RequestBody RecruiterProfileUpdateRequest request
    ) {
        RecruiterResponse response = profileService.updateRecruiterProfile(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruiter profile updated successfully",
                        response
                )
        );
    }

    // Placement Admin Profile
    @GetMapping("/placement-admin/profile")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    @Operation(summary = "Get Current Placement Admin Profile")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> getPlacementAdminProfile() {
        PlacementAdminResponse response = profileService.getPlacementAdminProfile();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement admin profile fetched successfully",
                        response
                )
        );
    }

    @PutMapping("/placement-admin/profile")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    @Operation(summary = "Update Current Placement Admin Profile")
    public ResponseEntity<ApiResponse<PlacementAdminResponse>> updatePlacementAdminProfile(
            @Valid @RequestBody PlacementAdminProfileUpdateRequest request
    ) {
        PlacementAdminResponse response = profileService.updatePlacementAdminProfile(request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement admin profile updated successfully",
                        response
                )
        );
    }
}