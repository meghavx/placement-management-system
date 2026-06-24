package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.company.CompanyCreateRequest;
import com.application.placementmanagementsystem.dtos.company.CompanyResponse;
import com.application.placementmanagementsystem.models.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public Company toEntity(CompanyCreateRequest request) {

        return Company.builder()
                .companyName(request.getCompanyName())
                .industry(request.getIndustry())
                .website(request.getWebsite())
                .location(request.getLocation())
                .description(request.getDescription())
                .build();
    }

    public CompanyResponse toResponse(Company company) {

        return CompanyResponse.builder()
                .id(company.getId())
                .companyName(company.getCompanyName())
                .industry(company.getIndustry())
                .website(company.getWebsite())
                .location(company.getLocation())
                .description(company.getDescription())
                .build();
    }
}