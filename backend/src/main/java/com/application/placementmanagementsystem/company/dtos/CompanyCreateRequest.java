package com.application.placementmanagementsystem.company.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CompanyCreateRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 255)
    private String companyName;

    @NotBlank(message = "Industry is required")
    @Size(max = 255)
    private String industry;

    @NotBlank(message = "Website is required")
    @Size(max = 255)
    private String website;

    @NotBlank(message = "Location is required")
    @Size(max = 255)
    private String location;

    private String description;
}