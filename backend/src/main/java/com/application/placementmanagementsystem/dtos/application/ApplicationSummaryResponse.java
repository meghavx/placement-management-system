package com.application.placementmanagementsystem.dtos.application;

import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class ApplicationSummaryResponse {

    private Long id;

    private String companyName;

    private String jobRole;

    private LocalDate driveDate;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;
}