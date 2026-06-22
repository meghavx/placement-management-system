package com.application.placementmanagementsystem.company.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompanyUpdateRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Website is required")
    private String website;

    @NotBlank(message = "Location is required")
    private String location;

    private String description;
}
