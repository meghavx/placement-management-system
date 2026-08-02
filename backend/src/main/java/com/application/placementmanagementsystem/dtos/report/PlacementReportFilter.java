package com.application.placementmanagementsystem.dtos.report;

import com.application.placementmanagementsystem.models.enums.Department;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementReportFilter {

    private Integer academicYear;

    private Department department;

    private Long companyId;

    private Long studentId;
}