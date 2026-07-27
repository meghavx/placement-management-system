package com.application.placementmanagementsystem.services.dashboard;

import com.application.placementmanagementsystem.dtos.dashboard.PlacementAdminDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.RecruiterDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.StudentDashboardResponse;

public interface DashboardService {

    StudentDashboardResponse getStudentDashboard();

    RecruiterDashboardResponse getRecruiterDashboard();

    PlacementAdminDashboardResponse getPlacementAdminDashboard();
}