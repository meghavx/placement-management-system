package com.application.placementmanagementsystem.dtos.company;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class CompanyCreateRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Website is required")
    @URL(message = "Invalid website URL")
    private String website;

    @NotBlank(message = "Location is required")
    private String location;

    private String description;
}