package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.report.PlacementReportFilter;
import com.application.placementmanagementsystem.dtos.report.PlacementReportResponse;
import com.application.placementmanagementsystem.models.enums.Department;
import com.application.placementmanagementsystem.models.enums.ReportFormat;
import com.application.placementmanagementsystem.services.report.ExcelExportService;
import com.application.placementmanagementsystem.services.report.PdfExportService;
import com.application.placementmanagementsystem.services.report.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Placement Reports")
public class ReportController {

    private final ReportService reportService;

    private final PdfExportService pdfExportService;

    private final ExcelExportService excelExportService;

    @Operation(summary = "Generate placement report")

    @GetMapping("/placements")
    public ResponseEntity<ApiResponse<PlacementReportResponse>>
    getPlacementReport(

            @RequestParam(required = false)
            Integer academicYear,

            @RequestParam(required = false)
            Department department,

            @RequestParam(required = false)
            Long companyId,

            @RequestParam(required = false)
            Long studentId

    ) {

        PlacementReportFilter filter =
                PlacementReportFilter.builder()
                        .academicYear(academicYear)
                        .department(department)
                        .companyId(companyId)
                        .studentId(studentId)
                        .build();

        PlacementReportResponse response =
                reportService.generatePlacementReport(filter);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Placement report generated successfully.",
                        response
                )
        );

    }

    @Operation(summary = "Export placement report")
    @GetMapping("/placements/export")
    public ResponseEntity<byte[]> exportPlacementReport(

            @RequestParam
            ReportFormat format,

            @RequestParam(required = false)
            Integer academicYear,

            @RequestParam(required = false)
            Department department,

            @RequestParam(required = false)
            Long companyId,

            @RequestParam(required = false)
            Long studentId

    ) {

        PlacementReportFilter filter =
                PlacementReportFilter.builder()
                        .academicYear(academicYear)
                        .department(department)
                        .companyId(companyId)
                        .studentId(studentId)
                        .build();

        PlacementReportResponse report =
                reportService.generatePlacementReport(filter);

        if (format == ReportFormat.PDF) {

            byte[] pdf =
                    pdfExportService.exportPlacementReport(report);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            ContentDisposition
                                    .attachment()
                                    .filename("placement-report.pdf")
                                    .build()
                                    .toString()
                    )
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        }

        byte[] excel =
                excelExportService.exportPlacementReport(report);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition
                                .attachment()
                                .filename("placement-report.xlsx")
                                .build()
                                .toString()
                )
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )
                .body(excel);

    }

}