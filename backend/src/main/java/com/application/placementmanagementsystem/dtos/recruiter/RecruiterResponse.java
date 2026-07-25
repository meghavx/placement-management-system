package com.application.placementmanagementsystem.dtos.recruiter;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecruiterResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String email;

    private String phoneNumber;

    private Boolean active;

    private Long companyId;

    private String companyName;

    private String designation;
}
