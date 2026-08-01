package com.application.placementmanagementsystem.services.report;

import com.application.placementmanagementsystem.dtos.report.PlacementReportFilter;
import com.application.placementmanagementsystem.dtos.report.PlacementReportResponse;

public interface ReportService {

    PlacementReportResponse generatePlacementReport(
            PlacementReportFilter filter
    );

}