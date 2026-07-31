package com.application.placementmanagementsystem.services.recruiter;

import com.application.placementmanagementsystem.dtos.recruiter.RecruiterCreateRequest;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterResponse;
import com.application.placementmanagementsystem.dtos.recruiter.RecruiterUpdateRequest;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.RecruiterMapper;
import com.application.placementmanagementsystem.models.Company;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.models.enums.RoleType;
import com.application.placementmanagementsystem.repositories.CompanyRepository;
import com.application.placementmanagementsystem.repositories.RecruiterRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecruiterServiceImpl implements RecruiterService {

    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final RecruiterMapper recruiterMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    private static final String DEFAULT_PASSWORD = "Recruiter@123";

    @Override
    public RecruiterResponse createRecruiter(RecruiterCreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(DEFAULT_PASSWORD))
                .role(RoleType.RECRUITER)
                .active(true)
                .build();
        User savedUser = userRepository.save(user);
        Recruiter recruiter = Recruiter.builder()
                .user(savedUser)
                .designation(request.getDesignation())
                .company(company)
                .build();
        Recruiter savedRecruiter = recruiterRepository.save(recruiter);

        auditLogService.log(
                AuditAction.CREATE,
                AuditEntityType.RECRUITER,
                savedRecruiter.getId(),
                "Created recruiter: " + savedRecruiter.getUser().getFullName()
        );

        return recruiterMapper.toResponse(savedRecruiter);
    }

    @Override
    public RecruiterResponse updateRecruiter(
            Long recruiterId,
            RecruiterUpdateRequest request
    ) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));

        User user = recruiter.getUser();
        if (!request.getEmail().equals(user.getEmail())
                && userRepository.existsByEmail(request.getEmail())
        ) {
            throw new DuplicateResourceException("Email already exists");
        }

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);

        recruiter.setCompany(company);
        recruiter.setDesignation(request.getDesignation());

        Recruiter updatedRecruiter = recruiterRepository.save(recruiter);

        auditLogService.log(
                AuditAction.UPDATE,
                AuditEntityType.RECRUITER,
                updatedRecruiter.getId(),
                "Updated recruiter: " + updatedRecruiter.getUser().getFullName()
        );

        return recruiterMapper.toResponse(updatedRecruiter);
    }

    @Override
    public RecruiterResponse updateRecruiterStatus(
            Long recruiterId,
            boolean active
    ) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));
        User user = recruiter.getUser();
        user.setActive(active);
        userRepository.save(user);

        auditLogService.log(
                active ? AuditAction.ACTIVATE : AuditAction.DEACTIVATE,
                AuditEntityType.RECRUITER,
                recruiter.getId(),
                (active ? "Activated recruiter: " : "Deactivated recruiter: ")
                        + recruiter.getUser().getFullName()
        );

        return recruiterMapper.toResponse(recruiter);
    }

    @Override
    @Transactional(readOnly = true)
    public RecruiterResponse getRecruiterById(Long recruiterId) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));
        return recruiterMapper.toResponse(recruiter);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecruiterResponse> getAllRecruiters() {
        return recruiterRepository.findAll()
                .stream()
                .map(recruiterMapper::toResponse)
                .toList();
    }
}
