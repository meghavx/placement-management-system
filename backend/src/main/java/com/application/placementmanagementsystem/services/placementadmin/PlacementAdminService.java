package com.application.placementmanagementsystem.services.placementadmin;

import com.application.placementmanagementsystem.dtos.placementadmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementadmin.UpdatePlacementAdminRequest;

import java.util.List;

public interface PlacementAdminService {
    PlacementAdminResponse createPlacementAdmin(CreatePlacementAdminRequest request);

    PlacementAdminResponse updatePlacementAdmin(Long id, UpdatePlacementAdminRequest request);

    PlacementAdminResponse updatePlacementAdminStatus(Long id, boolean active);

    PlacementAdminResponse getPlacementAdminById(Long id);

    List<PlacementAdminResponse> getAllPlacementAdmins();
}
