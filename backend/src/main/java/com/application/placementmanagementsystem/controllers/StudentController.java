package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.dtos.student.StudentCreateRequest;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;
import com.application.placementmanagementsystem.dtos.student.StudentStatusRequest;
import com.application.placementmanagementsystem.dtos.student.StudentUpdateRequest;
import com.application.placementmanagementsystem.services.student.StudentService;
import com.application.placementmanagementsystem.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /**
     * Create Student
     * Accessible by Placement Admin only.
     */
    @PostMapping
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    public ResponseEntity<ApiResponse<StudentResponse>> createStudent(
            @Valid @RequestBody StudentCreateRequest request) {

        StudentResponse response = studentService.createStudent(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<StudentResponse>builder()
                                .success(true)
                                .message("Student created successfully")
                                .data(response)
                                .build()
                );
    }

    /**
     * Update Student
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentUpdateRequest request) {

        StudentResponse response = studentService.updateStudent(id, request);

        return ResponseEntity.ok(
                ApiResponse.<StudentResponse>builder()
                        .success(true)
                        .message("Student updated successfully")
                        .data(response)
                        .build()
        );
    }

    /**
     * Activate / Deactivate Student
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateStudentStatus(
            @PathVariable Long id,
            @Valid @RequestBody StudentStatusRequest request) {

        studentService.updateStudentStatus(id, request);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Student status updated successfully")
                        .build()
        );
    }

    /**
     * Get Student by ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(
            @PathVariable Long id) {

        StudentResponse response = studentService.getStudentById(id);

        return ResponseEntity.ok(
                ApiResponse.<StudentResponse>builder()
                        .success(true)
                        .message("Student retrieved successfully")
                        .data(response)
                        .build()
        );
    }

    /**
     * Get All Students
     */
    @GetMapping
    @PreAuthorize("hasRole('PLACEMENT_ADMIN')")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {

        List<StudentResponse> response = studentService.getAllStudents();

        return ResponseEntity.ok(
                ApiResponse.<List<StudentResponse>>builder()
                        .success(true)
                        .message("Students retrieved successfully")
                        .data(response)
                        .build()
        );
    }
}