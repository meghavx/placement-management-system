package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityRequest;
import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityResponse;
import com.application.placementmanagementsystem.services.recruitmentactivity.RecruitmentActivityService;
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
@RequestMapping("/api/drives/{driveId}/activities")
@RequiredArgsConstructor
@Tag(name = "Recruitement Activity Scheduling")
public class RecruitmentActivityController {

    private final RecruitmentActivityService recruitmentActivityService;

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Create Recruitment Activity")
    public ResponseEntity<ApiResponse<RecruitmentActivityResponse>> createActivity(
            @PathVariable Long driveId,
            @Valid @RequestBody RecruitmentActivityRequest request
    ) {
        RecruitmentActivityResponse response = recruitmentActivityService.createActivity(driveId, request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ResponseBuilder.success(
                        "Recruitment activity created successfully",
                        response
                ));
    }

    @PutMapping("/{activityId}")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Update Recruitment Activity")
    public ResponseEntity<ApiResponse<RecruitmentActivityResponse>> updateActivity(
            @PathVariable Long driveId,
            @PathVariable Long activityId,
            @Valid @RequestBody RecruitmentActivityRequest request
    ) {
        RecruitmentActivityResponse response =
                recruitmentActivityService.updateActivity(
                        driveId,
                        activityId,
                        request
                );
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruitment activity updated successfully",
                        response
                )
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'RECRUITER', 'PLACEMENT_ADMIN')")
    @Operation(summary = "Get all Recruitment Activities for a specific Drive")
    public ResponseEntity<ApiResponse<List<RecruitmentActivityResponse>>> getActivitiesByDrive(
            @PathVariable Long driveId
    ) {
        List<RecruitmentActivityResponse> response = recruitmentActivityService.getActivitiesByDrive(driveId);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Recruitment activities fetched successfully",
                        response
                )
        );
    }
}