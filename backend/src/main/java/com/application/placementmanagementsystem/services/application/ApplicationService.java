package com.application.placementmanagementsystem.services.application;

import com.application.placementmanagementsystem.dtos.application.ApplicationResponse;
import com.application.placementmanagementsystem.dtos.application.ApplicationStatusUpdateRequest;
import com.application.placementmanagementsystem.dtos.application.ApplicationSummaryResponse;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse apply(Long driveId);

    List<ApplicationSummaryResponse> getMyApplications();

    ApplicationResponse getMyApplication(Long applicationId);

    List<ApplicationResponse> getApplicationsForDrive(Long driveId);

    ApplicationResponse updateApplicationStatus(
            Long applicationId,
            ApplicationStatusUpdateRequest request
    );

    List<ApplicationResponse> getAllApplications();

    ApplicationResponse getApplicationById(Long applicationId);
}