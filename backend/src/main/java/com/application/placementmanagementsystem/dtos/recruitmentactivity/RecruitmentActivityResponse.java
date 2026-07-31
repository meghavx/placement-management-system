package com.application.placementmanagementsystem.dtos.recruitmentactivity;

import com.application.placementmanagementsystem.models.enums.ActivityMode;
import com.application.placementmanagementsystem.models.enums.RecruitmentActivityType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record RecruitmentActivityResponse (
        Long id,

        Long driveId,

        RecruitmentActivityType activityType,

        String title,

        LocalDateTime scheduledAt,

        ActivityMode mode,

        String venue,

        String meetingLink,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {}