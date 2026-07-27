package com.application.placementmanagementsystem.dtos.eligibility;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class EligibilityEvaluationResult {

    private boolean eligible;

    private List<String> ineligibilityReasons;
}