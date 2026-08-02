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
    @Size(max = 100, message = "Student name cannot exceed 100 characters")
    private String fullName;

    @NotBlank(message = "Student email is required")
    @Email(message = "Please enter a valid email address")
    @Size(max = 100, message = "Email address cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be a valid 10-digit Indian mobile number")
    private String phoneNumber;

    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    @NotNull(message = "Department is required")
    private Department department;

    @NotNull(message = "Graduation year is required")
    @Min(value = 2000, message = "Graduation year must be after 2000")
    @Max(value = 2100, message = "Graduation year cannot be later than 2100")
    private Integer graduationYear;

    @NotNull(message = "CGPA is required")
    @DecimalMin(value = "0.00", message = "CGPA cannot be less than 0.00")
    @DecimalMax(value = "10.00", message = "CGPA cannot be greater than 10.00")
    private BigDecimal cgpa;

    @NotNull(message = "Current backlogs field is required")
    @PositiveOrZero(message = "Current backlogs cannot be negative" )
    private int currentBacklogs;
}
