package com.application.placementmanagementsystem.company.service;

import com.application.placementmanagementsystem.company.dtos.CompanyCreateRequest;
import com.application.placementmanagementsystem.company.dtos.CompanyResponse;
import com.application.placementmanagementsystem.company.dtos.CompanyUpdateRequest;

import java.util.List;

public interface CompanyService {

    CompanyResponse createCompany(CompanyCreateRequest request);

    CompanyResponse updateCompany(Long id, CompanyUpdateRequest request);

    CompanyResponse getCompanyById(Long id);

    List<CompanyResponse> getAllCompanies();
}
