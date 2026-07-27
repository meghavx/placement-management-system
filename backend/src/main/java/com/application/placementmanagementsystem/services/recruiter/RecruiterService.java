package com.application.placementmanagementsystem.services.recruiter;

import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterCreateRequest;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterUpdateRequest;

import java.util.List;

public interface RecruiterService {
    RecruiterResponse createRecruiter(RecruiterCreateRequest request);

    RecruiterResponse updateRecruiter(Long id, RecruiterUpdateRequest request);

    RecruiterResponse updateRecruiterStatus(Long id, boolean active);

    RecruiterResponse getRecruiterById(Long id);

    List<RecruiterResponse> getAllRecruiters();
}
