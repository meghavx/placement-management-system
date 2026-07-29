package com.application.placementmanagementsystem.services.recruitmentactivity;

import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityRequest;
import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityResponse;

import java.util.List;

public interface RecruitmentActivityService {

    RecruitmentActivityResponse createActivity(
            Long driveId,
            RecruitmentActivityRequest request
    );

    RecruitmentActivityResponse updateActivity(
            Long driveId,
            Long activityId,
            RecruitmentActivityRequest request
    );

    List<RecruitmentActivityResponse> getActivitiesByDrive(Long driveId);
}