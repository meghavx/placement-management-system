package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.models.Company;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.User;
import org.springframework.stereotype.Component;

@Component
public class RecruiterMapper {
    public RecruiterResponse toResponse(Recruiter recruiter) {

        User user = recruiter.getUser();
        Company company = recruiter.getCompany();

        return RecruiterResponse.builder()
                .id(recruiter.getId())
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .active(user.isActive())
                .companyId(company != null ? company.getId() : null)
                .companyName(company != null ? company.getCompanyName() : null)
                .designation(recruiter.getDesignation())
                .build();
    }
}

