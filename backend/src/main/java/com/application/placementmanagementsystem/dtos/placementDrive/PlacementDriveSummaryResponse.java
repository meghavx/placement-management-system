package com.application.placementmanagementsystem.dtos.placementDrive;

import com.application.placementmanagementsystem.models.enums.DriveStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class PlacementDriveSummaryResponse {

    private Long id;

    private String companyName;

    private String jobRole;

    private BigDecimal packageOffered;

    private String location;

    private LocalDate driveDate;

    private DriveStatus status;
}