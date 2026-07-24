package com.application.placementmanagementsystem.dtos.student;

import com.application.placementmanagementsystem.models.enums.Department;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class StudentUpdateRequest {

    @NotBlank(message = "Student name is required")
    @Size(max = 100)
    private String fullName;

    @NotBlank(message = "Student email is required")
    @Email
    @Size(max = 100)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Phone number must be a valid 10-digit Indian mobile number"
    )
    private String phoneNumber;

    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    @NotBlank(message = "Department is required")
    private Department department;

    @NotNull(message = "Graduation year is required")
    @Min(value = 2000, message = "Graduation year must be after 2000")
    @Max(value = 2100, message = "Graduation year is invalid")
    private Integer graduationYear;

    @NotNull(message = "CGPA is required")
    @DecimalMin("0.00")
    @DecimalMax("10.00")
    private BigDecimal cgpa;

    @NotNull(message = "Current backlogs field is required")
    @PositiveOrZero(message = "Current backlogs cannot be negative" )
    private int currentBacklogs;
}
