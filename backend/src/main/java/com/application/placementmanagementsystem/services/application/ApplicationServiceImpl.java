package com.application.placementmanagementsystem.services.application;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.application.ApplicationResponse;
import com.application.placementmanagementsystem.dtos.application.ApplicationSummaryResponse;
import com.application.placementmanagementsystem.dtos.eligibility.EligibilityEvaluationResult;
import com.application.placementmanagementsystem.exceptions.DuplicateResourceException;
import com.application.placementmanagementsystem.exceptions.InvalidRequestException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.ApplicationMapper;
import com.application.placementmanagementsystem.models.*;
import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import com.application.placementmanagementsystem.repositories.*;
import com.application.placementmanagementsystem.services.eligibility.EligibilityEvaluator;
import com.application.placementmanagementsystem.dtos.application.ApplicationStatusUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final PlacementDriveRepository placementDriveRepository;
    private final EligibilityCriteriaRepository eligibilityCriteriaRepository;
    private final ResumeRepository resumeRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final UserRepository userRepository;
    private final ApplicationMapper applicationMapper;

    private final EligibilityEvaluator eligibilityEvaluator;

    private static final String DRIVE_NOT_FOUND = "Placement drive not found.";
    private static final String APPLICATION_NOT_FOUND = "Application not found.";

    @Transactional
    @Override
    public ApplicationResponse apply(Long driveId) {

        Student student = getAuthenticatedStudent();

        PlacementDrive drive = placementDriveRepository.findById(driveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(DRIVE_NOT_FOUND));

        validateDrive(drive);

        validateResumeUploaded(student);

        validateEligibility(student, drive);

        if (applicationRepository.existsByStudentAndPlacementDrive(student, drive)) {
            throw new DuplicateResourceException(
                    "You have already applied for this placement drive."
            );
        }

        Application application = Application.builder()
                .student(student)
                .placementDrive(drive)
                .status(ApplicationStatus.APPLIED)
                .build();

        Application savedApplication =
                applicationRepository.save(application);

        return applicationMapper.toResponse(savedApplication);
    }

    @Override
    public List<ApplicationSummaryResponse> getMyApplications() {

        Student student = getAuthenticatedStudent();

        List<Application> applications =
                applicationRepository.findByStudent(student);

        return applicationMapper.toSummaryResponseList(applications);
    }

    @Override
    public ApplicationResponse getMyApplication(Long applicationId) {

        Student student = getAuthenticatedStudent();

        Application application =
                applicationRepository
                        .findByIdAndStudent(applicationId, student)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(APPLICATION_NOT_FOUND));

        return applicationMapper.toResponse(application);
    }

    @Override
    public List<ApplicationResponse> getApplicationsForDrive(Long driveId) {

        PlacementDrive placementDrive = getRecruiterOwnedDrive(driveId);

        List<Application> applications =
                applicationRepository.findByPlacementDrive(placementDrive);

        return applications.stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    @Transactional
    @Override
    public ApplicationResponse updateApplicationStatus(
            Long applicationId,
            ApplicationStatusUpdateRequest request
    ) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(APPLICATION_NOT_FOUND));

        validateRecruiterOwnsDrive(application);

        validateStatusTransition(
                application.getStatus(),
                request.getStatus()
        );

        application.setStatus(request.getStatus());

        Application updatedApplication =
                applicationRepository.save(application);

        return applicationMapper.toResponse(updatedApplication);
    }

    // Helper Methods

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

    private Student getAuthenticatedStudent() {

        User user = getAuthenticatedUser();

        return studentRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));
    }

    private Recruiter getAuthenticatedRecruiter() {

        User user = getAuthenticatedUser();

        return recruiterRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recruiter not found."));
    }

    private PlacementDrive getRecruiterOwnedDrive(Long driveId) {

        Recruiter recruiter = getAuthenticatedRecruiter();

        return placementDriveRepository
                .findByIdAndCompanyId(
                        driveId,
                        recruiter.getCompany().getId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(DRIVE_NOT_FOUND));
    }

    private void validateRecruiterOwnsDrive(Application application) {

        Recruiter recruiter = getAuthenticatedRecruiter();

        if (!application.getPlacementDrive()
                .getCompany()
                .getId()
                .equals(recruiter.getCompany().getId())) {

            throw new ResourceNotFoundException(APPLICATION_NOT_FOUND);
        }
    }

    // Validation Methods

    private void validateDrive(PlacementDrive drive) {

        if (drive.getStatus() != DriveStatus.OPEN) {
            throw new InvalidRequestException(
                    "Applications are allowed only for OPEN placement drives."
            );
        }

        if (drive.getApplicationDeadline().isBefore(LocalDate.now())) {
            throw new InvalidRequestException(
                    "Application deadline has already passed."
            );
        }
    }

    private void validateResumeUploaded(Student student) {

        if (resumeRepository.findByStudent(student).isEmpty()) {
            throw new InvalidRequestException(
                    "Please upload your resume before applying."
            );
        }
    }

    private void validateEligibility(
            Student student,
            PlacementDrive drive
    ) {

        EligibilityEvaluationResult evaluation =
                eligibilityEvaluator.evaluate(student, drive);

        if (!evaluation.isEligible()) {
            throw new InvalidRequestException(
                    String.join("; ", evaluation.getIneligibilityReasons())
            );
        }
    }

    private void validateStatusTransition(
            ApplicationStatus currentStatus,
            ApplicationStatus newStatus
    ) {

        if (currentStatus == newStatus) {
            throw new InvalidRequestException(
                    "Application is already in the requested status."
            );
        }

        switch (currentStatus) {

            case APPLIED -> {

                if (newStatus != ApplicationStatus.SHORTLISTED &&
                        newStatus != ApplicationStatus.REJECTED) {

                    throw new InvalidRequestException(
                            "Invalid status transition."
                    );
                }
            }

            case SHORTLISTED -> {

                if (newStatus != ApplicationStatus.INTERVIEW_SCHEDULED &&
                        newStatus != ApplicationStatus.REJECTED) {

                    throw new InvalidRequestException(
                            "Invalid status transition."
                    );
                }
            }

            case INTERVIEW_SCHEDULED -> {

                if (newStatus != ApplicationStatus.SELECTED &&
                        newStatus != ApplicationStatus.REJECTED) {

                    throw new InvalidRequestException(
                            "Invalid status transition."
                    );
                }
            }

            case SELECTED, REJECTED ->

                    throw new InvalidRequestException(
                            "Final application status cannot be changed."
                    );
        }
    }
}