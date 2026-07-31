package com.application.placementmanagementsystem.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardResponse {

    private long totalApplications;

    private long appliedCount;

    private long shortlistedCount;

    private long interviewScheduledCount;

    private long selectedCount;

    private long rejectedCount;

    private long availableDrives;
}