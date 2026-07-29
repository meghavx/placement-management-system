package com.application.placementmanagementsystem.services.company;

import com.application.placementmanagementsystem.dtos.company.CompanyCreateRequest;
import com.application.placementmanagementsystem.dtos.company.CompanyResponse;
import com.application.placementmanagementsystem.dtos.company.CompanyUpdateRequest;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.CompanyMapper;
import com.application.placementmanagementsystem.models.Company;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.repositories.CompanyRepository;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    private final AuditLogService auditLogService;

    @Override
    public CompanyResponse createCompany(
            CompanyCreateRequest request) {

        if (companyRepository.existsByCompanyNameIgnoreCase(
                request.getCompanyName())) {

            throw new DuplicateResourceException(
                    "Company already exists");
        }

        Company company = companyMapper.toEntity(request);

        Company savedCompany =
                companyRepository.save(company);

        auditLogService.log(
                AuditAction.CREATE,
                AuditEntityType.COMPANY,
                savedCompany.getId(),
                "Created company: " + savedCompany.getCompanyName()
        );

        return companyMapper.toResponse(savedCompany);
    }

    @Override
    public CompanyResponse updateCompany(
            Long id,
            CompanyUpdateRequest request) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id " + id));

        company.setCompanyName(request.getCompanyName());
        company.setIndustry(request.getIndustry());
        company.setWebsite(request.getWebsite());
        company.setLocation(request.getLocation());
        company.setDescription(request.getDescription());

        Company updatedCompany =
                companyRepository.save(company);

        auditLogService.log(
                AuditAction.UPDATE,
                AuditEntityType.COMPANY,
                updatedCompany.getId(),
                "Updated company: " + updatedCompany.getCompanyName()
        );

        return companyMapper.toResponse(updatedCompany);
    }

    @Override
    public CompanyResponse updateCompanyStatus(Long id, boolean active) {
        Company company = companyRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company with id = " + id + " not found"
                        )
                );
        company.setActive(active);
        Company updatedCompany = companyRepository.save(company);

        auditLogService.log(
                active ? AuditAction.ACTIVATE : AuditAction.DEACTIVATE,
                AuditEntityType.COMPANY,
                updatedCompany.getId(),
                (active ? "Activated company: " : "Deactivated company: ")
                        + updatedCompany.getCompanyName()
        );

        return companyMapper.toResponse(updatedCompany);
    }

    @Override
    public CompanyResponse getCompanyById(Long id) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id " + id));

        return companyMapper.toResponse(company);
    }

    @Override
    public List<CompanyResponse> getAllCompanies() {

        return companyRepository.findAll()
                .stream()
                .map(companyMapper::toResponse)
                .toList();
    }
}
