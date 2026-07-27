package com.application.placementmanagementsystem.services.dashboard;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.dashboard.PlacementAdminDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.RecruiterDashboardResponse;
import com.application.placementmanagementsystem.dtos.dashboard.StudentDashboardResponse;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.Recruiter;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import com.application.placementmanagementsystem.models.enums.DriveStatus;
import com.application.placementmanagementsystem.repositories.ApplicationRepository;
import com.application.placementmanagementsystem.repositories.CompanyRepository;
import com.application.placementmanagementsystem.repositories.PlacementDriveRepository;
import com.application.placementmanagementsystem.repositories.RecruiterRepository;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final PlacementDriveRepository placementDriveRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    private User getAuthenticatedUser() {

        CustomUserPrincipal principal =
                (CustomUserPrincipal) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        return userRepository
                .findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );
    }

    @Override
    public StudentDashboardResponse getStudentDashboard() {

        User user = getAuthenticatedUser();

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        return StudentDashboardResponse.builder()
                .totalApplications(
                        applicationRepository.countByStudent(student)
                )
                .appliedCount(
                        applicationRepository.countByStudentAndStatus(
                                student,
                                ApplicationStatus.APPLIED
                        )
                )
                .shortlistedCount(
                        applicationRepository.countByStudentAndStatus(
                                student,
                                ApplicationStatus.SHORTLISTED
                        )
                )
                .interviewScheduledCount(
                        applicationRepository.countByStudentAndStatus(
                                student,
                                ApplicationStatus.INTERVIEW_SCHEDULED
                        )
                )
                .selectedCount(
                        applicationRepository.countByStudentAndStatus(
                                student,
                                ApplicationStatus.SELECTED
                        )
                )
                .rejectedCount(
                        applicationRepository.countByStudentAndStatus(
                                student,
                                ApplicationStatus.REJECTED
                        )
                )
                .availableDrives(
                        placementDriveRepository.countByStatus(
                                DriveStatus.OPEN
                        )
                )
                .build();
    }

    @Override
    public RecruiterDashboardResponse getRecruiterDashboard() {

        User user = getAuthenticatedUser();

        Recruiter recruiter = recruiterRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recruiter not found."));

        Long companyId = recruiter.getCompany().getId();

        List<PlacementDrive> drives =
                placementDriveRepository.findByCompanyId(companyId);

        return RecruiterDashboardResponse.builder()
                .totalDrives(
                        placementDriveRepository.countByCompanyId(companyId)
                )
                .activeDrives(
                        placementDriveRepository.countByCompanyIdAndStatus(
                                companyId,
                                DriveStatus.OPEN
                        )
                )
                .totalApplications(
                        applicationRepository.countByPlacementDriveIn(drives)
                )
                .shortlistedCandidates(
                        applicationRepository.countByPlacementDriveInAndStatus(
                                drives,
                                ApplicationStatus.SHORTLISTED
                        )
                )
                .selectedCandidates(
                        applicationRepository.countByPlacementDriveInAndStatus(
                                drives,
                                ApplicationStatus.SELECTED
                        )
                )
                .build();
    }

    @Override
    public PlacementAdminDashboardResponse getPlacementAdminDashboard() {

        return PlacementAdminDashboardResponse.builder()
                .totalStudents(
                        studentRepository.count()
                )
                .totalRecruiters(
                        recruiterRepository.count()
                )
                .totalCompanies(
                        companyRepository.count()
                )
                .totalPlacementDrives(
                        placementDriveRepository.count()
                )
                .activePlacementDrives(
                        placementDriveRepository.countByStatus(
                                DriveStatus.OPEN
                        )
                )
                .totalApplications(
                        applicationRepository.count()
                )
                .selectedStudents(
                        applicationRepository.countByStatus(
                                ApplicationStatus.SELECTED
                        )
                )
                .build();
    }
}