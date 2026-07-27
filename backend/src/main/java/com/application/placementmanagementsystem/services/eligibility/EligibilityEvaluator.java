package com.application.placementmanagementsystem.services.eligibility;

import com.application.placementmanagementsystem.dtos.eligibility.EligibilityEvaluationResult;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.Student;

public interface EligibilityEvaluator {

    EligibilityEvaluationResult evaluate(
            Student student,
            PlacementDrive drive
    );
}
