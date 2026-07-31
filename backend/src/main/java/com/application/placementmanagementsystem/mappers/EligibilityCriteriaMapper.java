package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaRequest;
import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaResponse;
import com.application.placementmanagementsystem.models.EligibilityCriteria;
import com.application.placementmanagementsystem.models.PlacementDrive;
import org.springframework.stereotype.Component;

@Component
public class EligibilityCriteriaMapper {

    public EligibilityCriteria toEntity(
            EligibilityCriteriaRequest request,
            PlacementDrive placementDrive
    ) {
        return EligibilityCriteria.builder()
                .placementDrive(placementDrive)
                .minCgpa(request.getMinCgpa())
                .department(request.getDepartment())
                .maxBacklogs(request.getMaxBacklogs())
                .graduationYear(request.getGraduationYear())
                .build();
    }

    public EligibilityCriteriaResponse toResponse(EligibilityCriteria eligibilityCriteria) {
        if (eligibilityCriteria == null) {
            return null;
        }
        return EligibilityCriteriaResponse.builder()
                .id(eligibilityCriteria.getId())
                .placementDriveId(eligibilityCriteria.getPlacementDrive().getId())
                .minCgpa(eligibilityCriteria.getMinCgpa())
                .department(eligibilityCriteria.getDepartment())
                .maxBacklogs(eligibilityCriteria.getMaxBacklogs())
                .graduationYear(eligibilityCriteria.getGraduationYear())
                .build();
    }
}