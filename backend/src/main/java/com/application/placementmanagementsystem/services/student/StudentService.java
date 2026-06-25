package com.application.placementmanagementsystem.services.student;

import com.application.placementmanagementsystem.dtos.student.*;

import java.util.List;

public interface StudentService {

    StudentResponse createStudent(StudentCreateRequest request);

    StudentResponse updateStudent(
            Long studentId,
            StudentUpdateRequest request
    );

    StudentResponse getStudentById(Long studentId);

    List<StudentResponse> getAllStudents();

    void updateStudentStatus(
            Long studentId,
            StudentStatusRequest request
    );
}