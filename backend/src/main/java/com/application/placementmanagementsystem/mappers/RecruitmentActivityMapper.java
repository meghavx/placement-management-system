package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityResponse;
import com.application.placementmanagementsystem.models.RecruitmentActivity;
import org.springframework.stereotype.Component;

@Component
public class RecruitmentActivityMapper {

    public RecruitmentActivityResponse toResponse(RecruitmentActivity activity) {
        return RecruitmentActivityResponse.builder()
                .id(activity.getId())
                .driveId(activity.getPlacementDrive().getId())
                .activityType(activity.getActivityType())
                .title(activity.getTitle())
                .scheduledAt(activity.getScheduledAt())
                .mode(activity.getMode())
                .venue(activity.getVenue())
                .meetingLink(activity.getMeetingLink())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }
}