package com.application.placementmanagementsystem.dtos.report;

import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import com.application.placementmanagementsystem.models.enums.Department;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementReportRowResponse {

    private Long studentId;

    private String studentName;

    private String rollNumber;

    private Department department;

    private Integer graduationYear;

    private Long companyId;

    private String companyName;

    private Long driveId;

    private String jobRole;

    private BigDecimal packageOffered;

    private LocalDate driveDate;

    private ApplicationStatus applicationStatus;
}