package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.placementDrive.*;
import com.application.placementmanagementsystem.models.Company;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlacementDriveMapper {

    public PlacementDriveResponse toResponse(PlacementDrive drive) {
        return PlacementDriveResponse.builder()
                .id(drive.getId())
                .companyId(drive.getCompany().getId())
                .companyName(drive.getCompany().getCompanyName())
                .jobRole(drive.getJobRole())
                .jobDescription(drive.getJobDescription())
                .packageOffered(drive.getPackageOffered())
                .location(drive.getLocation())
                .applicationDeadline(drive.getApplicationDeadline())
                .driveDate(drive.getDriveDate())
                .status(drive.getStatus())
                .createdAt(drive.getCreatedAt())
                .updatedAt(drive.getUpdatedAt())
                .build();
    }

    public PlacementDriveSummaryResponse toSummaryResponse(PlacementDrive drive) {
        return PlacementDriveSummaryResponse.builder()
                .id(drive.getId())
                .companyName(drive.getCompany().getCompanyName())
                .jobRole(drive.getJobRole())
                .packageOffered(drive.getPackageOffered())
                .location(drive.getLocation())
                .driveDate(drive.getDriveDate())
                .status(drive.getStatus())
                .build();
    }

    public List<PlacementDriveSummaryResponse> toSummaryResponseList(List<PlacementDrive> drives) {
        return drives.stream()
                .map(this::toSummaryResponse)
                .toList();
    }
}