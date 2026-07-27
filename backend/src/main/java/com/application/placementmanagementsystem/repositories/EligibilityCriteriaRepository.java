package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.EligibilityCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EligibilityCriteriaRepository extends JpaRepository<EligibilityCriteria, Long> {

    Optional<EligibilityCriteria> findByPlacementDriveId(Long placementDriveId);

    boolean existsByPlacementDriveId(Long placementDriveId);
}
