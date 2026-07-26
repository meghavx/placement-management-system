package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {

    Optional<PlacementDrive> findByIdAndCompanyId(Long id, Long companyId);

    Optional<PlacementDrive> findByIdAndStatus(Long id, DriveStatus status);

    List<PlacementDrive> findByCompanyId(Long id);

    List<PlacementDrive> findByStatus(DriveStatus status);
}
