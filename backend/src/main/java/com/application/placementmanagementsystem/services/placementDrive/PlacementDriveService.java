package com.application.placementmanagementsystem.services.placementDrive;

import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveCreateRequest;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveResponse;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveSummaryResponse;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveUpdateRequest;
import com.application.placementmanagementsystem.models.enums.DriveStatus;

import java.util.List;

public interface PlacementDriveService {

    PlacementDriveResponse createPlacementDrive(PlacementDriveCreateRequest request);

    PlacementDriveResponse updatePlacementDrive(Long driveId, PlacementDriveUpdateRequest request);

    PlacementDriveResponse updatePlacementDriveStatus(Long driveId, DriveStatus status);

    PlacementDriveResponse getPlacementDriveById(Long driveId);

    List<PlacementDriveSummaryResponse> getPlacementDrives();
}