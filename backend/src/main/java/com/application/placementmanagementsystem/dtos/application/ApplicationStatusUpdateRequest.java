package com.application.placementmanagementsystem.dtos.application;

import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApplicationStatusUpdateRequest {

    @NotNull(message = "Application status is required.")
    private ApplicationStatus status;
}