package com.application.placementmanagementsystem.services.eligibilityCriteria;

import com.application.placementmanagementsystem.dtos.eligibilityCriteria.EligibilityCriteriaRequest;
import com.application.placementmanagementsystem.dtos.eligibilityCriteria.EligibilityCriteriaResponse;

public interface EligibilityCriteriaService {

    EligibilityCriteriaResponse createEligibilityCriteria(
            Long placementDriveId,
            EligibilityCriteriaRequest request
    );

    EligibilityCriteriaResponse updateEligibilityCriteria(
            Long placementDriveId,
            EligibilityCriteriaRequest request
    );

    EligibilityCriteriaResponse getEligibilityCriteria(
            Long placementDriveId
    );
}