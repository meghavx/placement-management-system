package com.application.placementmanagementsystem.services.profile;

import com.application.placementmanagementsystem.dtos.placementadmin.PlacementAdminResponse;
import com.application.placementmanagementsystem.dtos.profile.*;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;

public interface ProfileService {

    StudentResponse getStudentProfile();

    StudentResponse updateStudentProfile(StudentProfileUpdateRequest request);

    RecruiterResponse getRecruiterProfile();

    RecruiterResponse updateRecruiterProfile(RecruiterProfileUpdateRequest request);

    PlacementAdminResponse getPlacementAdminProfile();

    PlacementAdminResponse updatePlacementAdminProfile(PlacementAdminProfileUpdateRequest request);
}