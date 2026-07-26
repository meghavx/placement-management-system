package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.eligibilityCriteria.EligibilityCriteriaRequest;
import com.application.placementmanagementsystem.dtos.eligibilityCriteria.EligibilityCriteriaResponse;
import com.application.placementmanagementsystem.services.eligibilityCriteria.EligibilityCriteriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Eligibility Criteria Management")
public class EligibilityCriteriaController {

    private final EligibilityCriteriaService eligibilityCriteriaService;

    @PostMapping("/recruiter/drives/{driveId}/eligibility")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Create Eligibility Criteria")
    public ResponseEntity<ApiResponse<EligibilityCriteriaResponse>> createEligibilityCriteria(
            @PathVariable Long driveId,
            @Valid @RequestBody EligibilityCriteriaRequest request
    ) {
        EligibilityCriteriaResponse response =
                eligibilityCriteriaService.createEligibilityCriteria(driveId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseBuilder.success(
                        "Eligibility criteria created successfully",
                        response
                )
        );
    }

    @PutMapping("/recruiter/drives/{driveId}/eligibility")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Update Eligibility Criteria")
    public ResponseEntity<ApiResponse<EligibilityCriteriaResponse>> updateEligibilityCriteria(
            @PathVariable Long driveId,
            @Valid @RequestBody EligibilityCriteriaRequest request
    ) {
        EligibilityCriteriaResponse response =
                eligibilityCriteriaService.updateEligibilityCriteria(driveId, request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Eligibility criteria updated successfully",
                        response
                )
        );
    }

    @GetMapping("/drives/{driveId}/eligibility")
    @PreAuthorize("hasAnyRole('RECRUITER','PLACEMENT_ADMIN','STUDENT')")
    @Operation(summary = "Get Eligibility Criteria")
    public ResponseEntity<ApiResponse<EligibilityCriteriaResponse>> getEligibilityCriteria(
            @PathVariable Long driveId
    ) {
        EligibilityCriteriaResponse response =
                eligibilityCriteriaService.getEligibilityCriteria(driveId);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Eligibility criteria fetched successfully",
                        response
                )
        );
    }
}