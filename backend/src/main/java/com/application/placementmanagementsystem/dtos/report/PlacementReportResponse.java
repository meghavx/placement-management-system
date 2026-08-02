package com.application.placementmanagementsystem.dtos.report;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementReportResponse {

    private long totalStudents;

    private long totalPlacedStudents;

    private double placementPercentage;

    private BigDecimal highestPackage;

    private BigDecimal averagePackage;

    private List<PlacementReportRowResponse> placements;
}