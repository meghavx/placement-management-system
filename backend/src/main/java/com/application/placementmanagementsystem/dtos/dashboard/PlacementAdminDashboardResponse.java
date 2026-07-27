package com.application.placementmanagementsystem.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlacementAdminDashboardResponse {

    private long totalStudents;

    private long totalRecruiters;

    private long totalCompanies;

    private long totalPlacementDrives;

    private long activePlacementDrives;

    private long totalApplications;

    private long selectedStudents;
}