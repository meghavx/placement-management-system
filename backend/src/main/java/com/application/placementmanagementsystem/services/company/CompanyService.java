package com.application.placementmanagementsystem.services.company;

import com.application.placementmanagementsystem.dtos.company.CompanyCreateRequest;
import com.application.placementmanagementsystem.dtos.company.CompanyResponse;
import com.application.placementmanagementsystem.dtos.company.CompanyUpdateRequest;

import java.util.List;

public interface CompanyService {

    CompanyResponse createCompany(CompanyCreateRequest request);

    CompanyResponse updateCompany(Long id, CompanyUpdateRequest request);

    CompanyResponse getCompanyById(Long id);

    List<CompanyResponse> getAllCompanies();

    CompanyResponse updateCompanyStatus(Long id, boolean active);
}
