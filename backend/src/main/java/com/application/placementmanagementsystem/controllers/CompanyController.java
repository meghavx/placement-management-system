package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
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

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
@PreAuthorize("hasRole('PLACEMENT_ADMIN')")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<ApiResponse<CompanyResponse>> createCompany(
            @Valid @RequestBody CompanyCreateRequest request) {

        CompanyResponse response = companyService.createCompany(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<CompanyResponse>builder()
                                .success(true)
                                .message("Company created successfully")
                                .data(response)
                                .timestamp(LocalDateTime.now())
                                .build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateCompany(
            @PathVariable Long id,
            @Valid @RequestBody CompanyUpdateRequest request) {

        CompanyResponse response =
                companyService.updateCompany(id, request);

        return ResponseEntity.ok()
                .body(
                        ApiResponse.<CompanyResponse>builder()
                                .success(true)
                                .message("Company updated successfully")
                                .data(response)
                                .timestamp(LocalDateTime.now())
                                .build()
                );

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateCompanyStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        CompanyResponse company = companyService.updateCompanyStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ApiResponse.<CompanyResponse>builder()
                        .success(true)
                        .message("Company " + statusMessage + " successfully")
                        .data(company)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyResponse>> getCompanyById(
            @PathVariable Long id) {

        CompanyResponse response =
                companyService.getCompanyById(id);

        return ResponseEntity.ok()
                .body(
                        ApiResponse.<CompanyResponse>builder()
                                .success(true)
                                .message("Company fetched successfully")
                                .data(response)
                                .timestamp(LocalDateTime.now())
                                .build()
                );

    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CompanyResponse>>> getAllCompanies() {

        List<CompanyResponse> response =
                companyService.getAllCompanies();

        return ResponseEntity.ok()
                .body(
                        ApiResponse.<List<CompanyResponse>>builder()
                                .success(true)
                                .message("Companies fetched successfully")
                                .data(response)
                                .timestamp(LocalDateTime.now())
                                .build()
                );
    }
}
