package com.application.placementmanagementsystem.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterDashboardResponse {

    private long totalDrives;

    private long activeDrives;

    private long totalApplications;

    private long shortlistedCandidates;

    private long selectedCandidates;
}