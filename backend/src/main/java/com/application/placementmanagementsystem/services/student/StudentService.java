package com.application.placementmanagementsystem.services.student;

import com.application.placementmanagementsystem.dtos.student.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    StudentResponse createStudent(StudentCreateRequest request);

    StudentImportResponse importStudents(MultipartFile file);

    StudentResponse updateStudent(
            Long studentId,
            StudentUpdateRequest request
    );

    StudentResponse getStudentById(Long studentId);

    List<StudentResponse> getAllStudents();

    StudentResponse updateStudentStatus(
            Long studentId,
            boolean active
    );
}