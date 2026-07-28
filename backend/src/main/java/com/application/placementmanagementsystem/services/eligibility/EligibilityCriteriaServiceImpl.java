package com.application.placementmanagementsystem.services.eligibility;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaRequest;
import com.application.placementmanagementsystem.dtos.eligibility.EligibilityCriteriaResponse;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.exceptions.InvalidRequestException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.EligibilityCriteriaMapper;
import com.application.placementmanagementsystem.models.EligibilityCriteria;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import com.application.placementmanagementsystem.repositories.EligibilityCriteriaRepository;
import com.application.placementmanagementsystem.repositories.PlacementDriveRepository;
import com.application.placementmanagementsystem.repositories.RecruiterRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EligibilityCriteriaServiceImpl implements EligibilityCriteriaService {

    private final EligibilityCriteriaRepository eligibilityCriteriaRepository;
    private final PlacementDriveRepository placementDriveRepository;
    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;
    private final EligibilityCriteriaMapper eligibilityCriteriaMapper;
    private final AuditLogService auditLogService;
    private static final String DRIVE_NOT_FOUND = "Placement drive not found.";
    private static final String ELIGIBILITY_NOT_FOUND = "Eligibility criteria not found.";

    @Transactional
    @Override
    public EligibilityCriteriaResponse createEligibilityCriteria(
            Long placementDriveId,
            EligibilityCriteriaRequest request
    ) {
        Recruiter recruiter = getAuthenticatedRecruiter();
        PlacementDrive placementDrive = getOwnedPlacementDrive(placementDriveId, recruiter.getCompany().getId());

        validateDriveIsDraft(placementDrive);

        if (eligibilityCriteriaRepository.existsByPlacementDriveId(placementDriveId)) {
            throw new DuplicateResourceException("Eligibility criteria already exists for this placement drive.");
        }

        EligibilityCriteria eligibilityCriteria = eligibilityCriteriaMapper.toEntity(request, placementDrive);
        EligibilityCriteria savedEligibility = eligibilityCriteriaRepository.save(eligibilityCriteria);

        auditLogService.log(
                AuditAction.CREATE,
                AuditEntityType.ELIGIBILITY_CRITERIA,
                savedEligibility.getId(),
                "Created eligibility criteria."
        );

        return eligibilityCriteriaMapper.toResponse(savedEligibility);
    }

    @Transactional
    @Override
    public EligibilityCriteriaResponse updateEligibilityCriteria(
            Long placementDriveId,
            EligibilityCriteriaRequest request
    ) {
        Recruiter recruiter = getAuthenticatedRecruiter();
        PlacementDrive placementDrive = getOwnedPlacementDrive(placementDriveId, recruiter.getCompany().getId());

        validateDriveIsDraft(placementDrive);

        EligibilityCriteria eligibilityCriteria = eligibilityCriteriaRepository
                .findByPlacementDriveId(placementDriveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(ELIGIBILITY_NOT_FOUND));

        eligibilityCriteria.setMinCgpa(request.getMinCgpa());
        eligibilityCriteria.setDepartment(request.getDepartment());
        eligibilityCriteria.setMaxBacklogs(request.getMaxBacklogs());
        eligibilityCriteria.setGraduationYear(request.getGraduationYear());

        EligibilityCriteria updatedEligibility = eligibilityCriteriaRepository.save(eligibilityCriteria);

        auditLogService.log(
                AuditAction.UPDATE,
                AuditEntityType.ELIGIBILITY_CRITERIA,
                updatedEligibility.getId(),
                "Updated eligibility criteria."
        );

        return eligibilityCriteriaMapper.toResponse(updatedEligibility);
    }

    @Override
    public EligibilityCriteriaResponse getEligibilityCriteria(Long placementDriveId) {

        User user = getAuthenticatedUser();

        switch (user.getRole()) {
            case RECRUITER -> {
                Recruiter recruiter = getAuthenticatedRecruiter();
                getOwnedPlacementDrive(placementDriveId, recruiter.getCompany().getId());
            }
            case STUDENT ->
                    placementDriveRepository
                            .findByIdAndStatus(placementDriveId, DriveStatus.OPEN)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(DRIVE_NOT_FOUND));

            case PLACEMENT_ADMIN ->
                    placementDriveRepository
                            .findById(placementDriveId)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(DRIVE_NOT_FOUND));

            default ->
                    throw new IllegalStateException("Unsupported role.");
        }

        EligibilityCriteria eligibilityCriteria =
                eligibilityCriteriaRepository
                        .findByPlacementDriveId(placementDriveId)
                        .orElseThrow(() -> new ResourceNotFoundException(ELIGIBILITY_NOT_FOUND));

        return eligibilityCriteriaMapper.toResponse(eligibilityCriteria);
    }

    // Private Helper Methods

    private User getAuthenticatedUser() {

        CustomUserPrincipal principal =
                (CustomUserPrincipal) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }

    private Recruiter getAuthenticatedRecruiter() {

        User user = getAuthenticatedUser();

        return recruiterRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recruiter not found."));
    }

    private PlacementDrive getOwnedPlacementDrive(Long driveId, Long companyId) {
        return placementDriveRepository
                .findByIdAndCompanyId(driveId, companyId)
                .orElseThrow(() -> new ResourceNotFoundException(DRIVE_NOT_FOUND));
    }

    private void validateDriveIsDraft(PlacementDrive placementDrive) {
        if (placementDrive.getStatus() != DriveStatus.DRAFT) {
            throw new InvalidRequestException(
                    "Eligibility criteria can only be modified for DRAFT placement drives."
            );
        }
    }
}