package com.application.placementmanagementsystem.services.placementAdmin;

import com.application.placementmanagementsystem.dtos.placementAdmin.CreatePlacementAdminRequest;
import com.application.placementmanagementsystem.dtos.placementAdmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.placementAdmin.UpdatePlacementAdminRequest;

import java.util.List;

public interface PlacementAdminService {
    PlacementAdminResponse createPlacementAdmin(CreatePlacementAdminRequest request);

    PlacementAdminResponse updatePlacementAdmin(Long id, UpdatePlacementAdminRequest request);

    PlacementAdminResponse updatePlacementAdminStatus(Long id, boolean active);

    PlacementAdminResponse getPlacementAdminById(Long id);

    List<PlacementAdminResponse> getAllPlacementAdmins();
}
