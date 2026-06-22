package com.application.placementmanagementsystem.company.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyResponse {

    private Long id;

    private String companyName;

    private String industry;

    private String website;

    private String location;

    private String description;
}
