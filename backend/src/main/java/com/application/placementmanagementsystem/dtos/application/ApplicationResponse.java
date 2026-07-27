package com.application.placementmanagementsystem.dtos.application;

import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class ApplicationResponse {

    private Long id;

    private Long studentId;
    private String studentName;
    private String rollNumber;

    private Long driveId;
    private String companyName;
    private String jobRole;
    private BigDecimal packageOffered;
    private LocalDate driveDate;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}