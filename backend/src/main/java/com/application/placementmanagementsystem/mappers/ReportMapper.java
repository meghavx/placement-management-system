package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.report.PlacementReportRowResponse;
import com.application.placementmanagementsystem.models.Application;
import org.springframework.stereotype.Component;

@Component
public class ReportMapper {

    public PlacementReportRowResponse toPlacementReportRow(Application application) {

        return PlacementReportRowResponse.builder()
                .studentId(application.getStudent().getId())
                .studentName(application.getStudent().getUser().getFullName())
                .rollNumber(application.getStudent().getRollNumber())
                .department(application.getStudent().getDepartment())
                .graduationYear(application.getStudent().getGraduationYear())
                .companyId(application.getPlacementDrive().getCompany().getId())
                .companyName(application.getPlacementDrive().getCompany().getCompanyName())
                .driveId(application.getPlacementDrive().getId())
                .jobRole(application.getPlacementDrive().getJobRole())
                .packageOffered(application.getPlacementDrive().getPackageOffered())
                .driveDate(application.getPlacementDrive().getDriveDate())
                .applicationStatus(application.getStatus())
                .build();
    }
}