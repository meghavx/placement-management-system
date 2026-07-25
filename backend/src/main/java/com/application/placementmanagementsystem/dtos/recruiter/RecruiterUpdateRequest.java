package com.application.placementmanagementsystem.dtos.recruiter;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RecruiterUpdateRequest {
    @NotBlank(message = "Recruiter name is required")
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;

    @NotBlank(message = "Recruiter email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Phone number must be a valid 10-digit Indian mobile number"
    )
    private String phoneNumber;

    @NotNull(message = "Company is required")
    @Positive(message = "Company ID must be positive")
    private Long companyId;

    @NotBlank(message = "Designation is required")
    @Size(max = 255, message = "Designation must not exceed 255 characters")
    private String designation;
}