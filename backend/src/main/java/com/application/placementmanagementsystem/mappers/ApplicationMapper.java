package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.application.ApplicationResponse;
import com.application.placementmanagementsystem.dtos.application.ApplicationSummaryResponse;
import com.application.placementmanagementsystem.models.Application;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationMapper {

    public ApplicationResponse toResponse(Application application) {

        return ApplicationResponse.builder()
                .id(application.getId())

                .studentId(application.getStudent().getId())
                .studentName(application.getStudent().getUser().getFullName())
                .rollNumber(application.getStudent().getRollNumber())

                .driveId(application.getPlacementDrive().getId())
                .companyName(application.getPlacementDrive().getCompany().getCompanyName())
                .jobRole(application.getPlacementDrive().getJobRole())
                .packageOffered(application.getPlacementDrive().getPackageOffered())
                .driveDate(application.getPlacementDrive().getDriveDate())

                .status(application.getStatus())

                .appliedAt(application.getAppliedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }

    public ApplicationSummaryResponse toSummaryResponse(Application application) {

        return ApplicationSummaryResponse.builder()
                .id(application.getId())

                .companyName(application.getPlacementDrive().getCompany().getCompanyName())

                .jobRole(application.getPlacementDrive().getJobRole())

                .driveDate(application.getPlacementDrive().getDriveDate())

                .status(application.getStatus())

                .appliedAt(application.getAppliedAt())
                .build();
    }

    public List<ApplicationSummaryResponse> toSummaryResponseList(
            List<Application> applications
    ) {
        return applications.stream()
                .map(this::toSummaryResponse)
                .toList();
    }
}