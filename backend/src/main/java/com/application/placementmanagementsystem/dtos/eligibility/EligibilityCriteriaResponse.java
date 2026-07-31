package com.application.placementmanagementsystem.dtos.eligibility;

import com.application.placementmanagementsystem.models.enums.Department;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class EligibilityCriteriaResponse {

    private Long id;

    private Long placementDriveId;

    private BigDecimal minCgpa;

    private Department department;

    private Integer maxBacklogs;

    private Integer graduationYear;
}