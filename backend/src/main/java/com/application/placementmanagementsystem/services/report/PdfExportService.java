package com.application.placementmanagementsystem.services.report;

import com.application.placementmanagementsystem.dtos.report.PlacementReportResponse;

public interface PdfExportService {

    byte[] exportPlacementReport(
            PlacementReportResponse report
    );

}