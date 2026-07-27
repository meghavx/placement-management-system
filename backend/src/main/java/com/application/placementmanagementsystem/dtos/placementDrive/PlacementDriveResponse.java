package com.application.placementmanagementsystem.dtos.placementDrive;

import com.application.placementmanagementsystem.dtos.eligibilityCriteria.EligibilityCriteriaResponse;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class PlacementDriveResponse {

    private Long id;

    private Long companyId;

    private String companyName;

    private String jobRole;

    private String jobDescription;

    private BigDecimal packageOffered;

    private String location;

    private LocalDate applicationDeadline;

    private LocalDate driveDate;

    private DriveStatus status;

    private EligibilityCriteriaResponse eligibility;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}