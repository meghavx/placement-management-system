package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.company.CompanyCreateRequest;
import com.application.placementmanagementsystem.dtos.company.CompanyResponse;
import com.application.placementmanagementsystem.dtos.company.CompanyUpdateRequest;
import com.application.placementmanagementsystem.services.company.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@PreAuthorize("hasRole('PLACEMENT_ADMIN')")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<ApiResponse<CompanyResponse>> createCompany(
            @Valid @RequestBody CompanyCreateRequest request
    ) {
        CompanyResponse response = companyService.createCompany(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseBuilder.success(
                        "Company created successfully",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateCompany(
            @PathVariable Long id,
            @Valid @RequestBody CompanyUpdateRequest request
    ) {
        CompanyResponse response = companyService.updateCompany(id, request);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Company updated successfully",
                        response
                )
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateCompanyStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        CompanyResponse response = companyService.updateCompanyStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Company " + statusMessage + " successfully",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyResponse>> getCompanyById(
            @PathVariable Long id
    ) {
        CompanyResponse response = companyService.getCompanyById(id);
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Company fetched successfully",
                        response
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CompanyResponse>>> getAllCompanies() {
        List<CompanyResponse> response = companyService.getAllCompanies();
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Companies fetched successfully",
                        response
                )
        );
    }
}
