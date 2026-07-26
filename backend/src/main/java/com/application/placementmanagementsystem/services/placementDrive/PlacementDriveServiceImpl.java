package com.application.placementmanagementsystem.services.placementDrive;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveCreateRequest;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveResponse;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveSummaryResponse;
import com.application.placementmanagementsystem.dtos.placementDrive.PlacementDriveUpdateRequest;
import com.application.placementmanagementsystem.exceptions.InvalidRequestException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.PlacementDriveMapper;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import com.application.placementmanagementsystem.repositories.PlacementDriveRepository;
import com.application.placementmanagementsystem.repositories.RecruiterRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementDriveServiceImpl implements PlacementDriveService {

    private final PlacementDriveRepository placementDriveRepository;
    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;
    private final PlacementDriveMapper placementDriveMapper;

    private static final String DRIVE_NOT_FOUND = "Placement drive not found.";

    @Transactional
    @Override
    public PlacementDriveResponse createPlacementDrive(
            PlacementDriveCreateRequest request
    ) {
        Recruiter recruiter = getAuthenticatedRecruiter();
        validateDriveDates(request.getApplicationDeadline(), request.getDriveDate());

        PlacementDrive placementDrive = PlacementDrive.builder()
                .company(recruiter.getCompany())
                .jobRole(request.getJobRole())
                .jobDescription(request.getJobDescription())
                .packageOffered(request.getPackageOffered())
                .location(request.getLocation())
                .applicationDeadline(request.getApplicationDeadline())
                .driveDate(request.getDriveDate())
                .status(DriveStatus.OPEN)
                .build();

        PlacementDrive savedDrive = placementDriveRepository.save(placementDrive);
        return placementDriveMapper.toResponse(savedDrive);
    }

    @Transactional
    @Override
    public PlacementDriveResponse updatePlacementDrive(
            Long driveId,
            PlacementDriveUpdateRequest request
    ) {
        Recruiter recruiter = getAuthenticatedRecruiter();
        PlacementDrive placementDrive = getOwnedPlacementDrive(driveId, recruiter.getCompany().getId());
        if (placementDrive.getStatus() != DriveStatus.OPEN) {
            throw new InvalidRequestException("Only OPEN placement drives can be updated.");
        }
        validateDriveDates(request.getApplicationDeadline(), request.getDriveDate());

        placementDrive.setJobRole(request.getJobRole());
        placementDrive.setJobDescription(request.getJobDescription());
        placementDrive.setPackageOffered(request.getPackageOffered());
        placementDrive.setLocation(request.getLocation());
        placementDrive.setApplicationDeadline(request.getApplicationDeadline());
        placementDrive.setDriveDate(request.getDriveDate());

        PlacementDrive updatedDrive = placementDriveRepository.save(placementDrive);
        return placementDriveMapper.toResponse(updatedDrive);
    }

    @Transactional
    @Override
    public PlacementDriveResponse updatePlacementDriveStatus(
            Long driveId,
            DriveStatus status
    ) {
        Recruiter recruiter = getAuthenticatedRecruiter();
        PlacementDrive placementDrive = getOwnedPlacementDrive(driveId, recruiter.getCompany().getId());
        validateStatusTransition(placementDrive.getStatus(), status);
        placementDrive.setStatus(status);
        PlacementDrive updatedDrive = placementDriveRepository.save(placementDrive);
        return placementDriveMapper.toResponse(updatedDrive);
    }

    @Override
    public PlacementDriveResponse getPlacementDriveById(
            Long driveId
    ) {
        User user = getAuthenticatedUser();
        PlacementDrive placementDrive;

        switch (user.getRole()) {
            case RECRUITER -> {
                Recruiter recruiter = getAuthenticatedRecruiter();
                placementDrive = placementDriveRepository
                        .findByIdAndCompanyId(
                                driveId,
                                recruiter.getCompany().getId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(DRIVE_NOT_FOUND));
            }

            case PLACEMENT_ADMIN ->
                    placementDrive = placementDriveRepository
                            .findById(driveId)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(DRIVE_NOT_FOUND));

            case STUDENT ->
                    placementDrive = placementDriveRepository
                            .findByIdAndStatus(driveId, DriveStatus.OPEN)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(DRIVE_NOT_FOUND));

            default ->
                    throw new IllegalStateException("Unsupported role.");
        }
        return placementDriveMapper.toResponse(placementDrive);
    }

    @Override
    public List<PlacementDriveSummaryResponse> getPlacementDrives() {

        User user = getAuthenticatedUser();
        List<PlacementDrive> placementDrives;

        switch (user.getRole()) {
            case RECRUITER -> {
                Recruiter recruiter = getAuthenticatedRecruiter();
                placementDrives = placementDriveRepository.findByCompanyId(recruiter.getCompany().getId());
            }

            case PLACEMENT_ADMIN ->
                    placementDrives = placementDriveRepository.findAll();

            case STUDENT ->
                    placementDrives = placementDriveRepository.findByStatus(DriveStatus.OPEN);

            default ->
                    throw new IllegalStateException("Unsupported role.");
        }
        return placementDriveMapper.toSummaryResponseList(placementDrives);
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

    private PlacementDrive getOwnedPlacementDrive(
            Long driveId,
            Long companyId
    ) {
        return placementDriveRepository
                .findByIdAndCompanyId(driveId, companyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(DRIVE_NOT_FOUND));
    }

    private void validateDriveDates(
            LocalDate applicationDeadline,
            LocalDate driveDate
    ) {
        if (!driveDate.isAfter(applicationDeadline)) {
            throw new InvalidRequestException("Drive date must be after the application deadline.");
        }
    }

    private void validateStatusTransition(
            DriveStatus currentStatus,
            DriveStatus newStatus
    ) {
        switch (currentStatus) {
            case OPEN -> {
                if (newStatus != DriveStatus.CLOSED &&
                        newStatus != DriveStatus.CANCELLED) {
                    throw new InvalidRequestException("Invalid status transition.");
                }
            }
            case CLOSED -> {
                if (newStatus != DriveStatus.COMPLETED) {
                    throw new InvalidRequestException("Invalid status transition.");
                }
            }
            default -> throw new InvalidRequestException("Status cannot be changed.");
        }
    }
}