package com.application.placementmanagementsystem.repositories;

import com.application.placementmanagementsystem.models.Application;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.enums.ApplicationStatus;
import com.application.placementmanagementsystem.models.enums.Department;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByStudentAndPlacementDrive(
            Student student,
            PlacementDrive placementDrive
    );

    List<Application> findByStudent(Student student);

    Optional<Application> findByIdAndStudent(
            Long id,
            Student student
    );

    List<Application> findByPlacementDrive(
            PlacementDrive placementDrive
    );

    long countByStudent(Student student);

    long countByStudentAndStatus(
            Student student,
            ApplicationStatus status
    );

    long countByPlacementDriveIn(List<PlacementDrive> placementDrives);

    long countByPlacementDriveInAndStatus(
            List<PlacementDrive> placementDrives,
            ApplicationStatus status
    );

    long countByStatus(ApplicationStatus status);

    @EntityGraph(attributePaths = {
            "student",
            "student.user",
            "placementDrive",
            "placementDrive.company"
    })
    @Override
    List<Application> findAll();
}