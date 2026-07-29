package com.application.placementmanagementsystem.dtos.recruitmentactivity;

import com.application.placementmanagementsystem.models.enums.ActivityMode;
import com.application.placementmanagementsystem.models.enums.RecruitmentActivityType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record RecruitmentActivityRequest(

        @NotNull(message = "Activity type is required")
        RecruitmentActivityType activityType,

        @NotBlank(message = "Activity title is required")
        @Size(max = 150, message = "Activity title must not exceed 150 characters")
        String title,

        @NotNull(message = "Scheduled date and time are required")
        @Future(message = "Activity must be scheduled for a future date and time")
        LocalDateTime scheduledAt,

        @NotNull(message = "Activity mode is required")
        ActivityMode mode,

        String venue,

        String meetingLink
) {}