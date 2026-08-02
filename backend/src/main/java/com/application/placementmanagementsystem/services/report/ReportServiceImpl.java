package com.application.placementmanagementsystem.services.report;

import com.application.placementmanagementsystem.dtos.report.*;
import com.application.placementmanagementsystem.exceptions.InvalidRequestException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.ReportMapper;
import com.application.placementmanagementsystem.models.Application;
import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import com.application.placementmanagementsystem.repositories.ApplicationRepository;
import com.application.placementmanagementsystem.repositories.CompanyRepository;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ApplicationRepository applicationRepository;

    private final StudentRepository studentRepository;

    private final CompanyRepository companyRepository;

    private final ReportMapper reportMapper;

    @Override
    public PlacementReportResponse generatePlacementReport(
            PlacementReportFilter filter
    ) {

        validateFilters(filter);

        List<Application> filteredApplications =
                applicationRepository.findAll()
                        .stream()
                        .filter(application -> matchesFilter(application, filter))
                        .toList();

        List<PlacementReportRowResponse> rows =
                filteredApplications.stream()
                        .map(reportMapper::toPlacementReportRow)
                        .toList();

        return PlacementReportResponse.builder()
                .totalStudents(totalStudents(filteredApplications))
                .totalPlacedStudents(totalPlaced(filteredApplications))
                .placementPercentage(
                        placementPercentage(filteredApplications)
                )
                .highestPackage(highestPackage(filteredApplications))
                .averagePackage(averagePackage(filteredApplications))
                .placements(rows)
                .build();
    }

    private void validateFilters(
            PlacementReportFilter filter
    ) {

        if (filter.getCompanyId() != null &&
                !companyRepository.existsById(filter.getCompanyId())) {

            throw new ResourceNotFoundException(
                    "Company not found."
            );
        }

        if (filter.getStudentId() != null &&
                !studentRepository.existsById(filter.getStudentId())) {

            throw new ResourceNotFoundException(
                    "Student not found."
            );
        }

        if (filter.getAcademicYear() != null &&
                filter.getAcademicYear() < 2000) {

            throw new InvalidRequestException(
                    "Invalid academic year."
            );
        }

    }

    private boolean matchesFilter(
            Application application,
            PlacementReportFilter filter
    ) {

        if (filter.getAcademicYear() != null &&
                !application.getStudent()
                        .getGraduationYear()
                        .equals(filter.getAcademicYear())) {

            return false;
        }

        if (filter.getDepartment() != null &&
                application.getStudent()
                        .getDepartment() != filter.getDepartment()) {

            return false;
        }

        if (filter.getCompanyId() != null &&
                !application.getPlacementDrive()
                        .getCompany()
                        .getId()
                        .equals(filter.getCompanyId())) {

            return false;
        }

        if (filter.getStudentId() != null &&
                !application.getStudent()
                        .getId()
                        .equals(filter.getStudentId())) {

            return false;
        }

        return true;
    }

    private long totalStudents(
            List<Application> applications
    ) {

        return applications.stream()
                .map(application -> application.getStudent().getId())
                .distinct()
                .count();
    }

    private long totalPlaced(
            List<Application> applications
    ) {

        return applications.stream()
                .filter(application ->
                        application.getStatus() ==
                                ApplicationStatus.SELECTED)
                .count();
    }

    private double placementPercentage(
            List<Application> applications
    ) {

        long totalStudents = totalStudents(applications);

        if (totalStudents == 0) {
            return 0;
        }

        double percentage =
                (double) totalPlaced(applications)
                        * 100
                        / totalStudents;

        return BigDecimal.valueOf(percentage)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private BigDecimal highestPackage(
            List<Application> applications
    ) {

        return applications.stream()
                .filter(application ->
                        application.getStatus() ==
                                ApplicationStatus.SELECTED)
                .map(application ->
                        application.getPlacementDrive()
                                .getPackageOffered())
                .max(Comparator.naturalOrder())
                .orElse(BigDecimal.ZERO);
    }

    private BigDecimal averagePackage(
            List<Application> applications
    ) {

        List<BigDecimal> packages =
                applications.stream()
                        .filter(application ->
                                application.getStatus() ==
                                        ApplicationStatus.SELECTED)
                        .map(application ->
                                application.getPlacementDrive()
                                        .getPackageOffered())
                        .toList();

        if (packages.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal total = packages.stream()
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );

        return total.divide(
                BigDecimal.valueOf(packages.size()),
                2,
                RoundingMode.HALF_UP
        );
    }

}