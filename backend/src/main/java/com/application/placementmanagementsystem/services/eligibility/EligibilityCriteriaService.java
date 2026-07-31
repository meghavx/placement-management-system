package com.application.placementmanagementsystem.services.eligibility;

import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaRequest;
import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaResponse;

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