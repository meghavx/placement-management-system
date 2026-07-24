package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.student.StudentCreateRequest;
import com.application.placementmanagementsystem.dtos.student.StudentResponse;
import com.application.placementmanagementsystem.dtos.student.StudentStatusRequest;
import com.application.placementmanagementsystem.dtos.student.StudentUpdateRequest;
import com.application.placementmanagementsystem.services.student.StudentService;
import com.application.placementmanagementsystem.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@PreAuthorize("hasRole('PLACEMENT_ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Student Management")
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    @Operation(summary = "Add Student")
    public ResponseEntity<ApiResponse<StudentResponse>> createStudent(
            @Valid @RequestBody StudentCreateRequest request) {

        StudentResponse response = studentService.createStudent(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseBuilder.success(
                        "Student created successfully",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Student")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentUpdateRequest request) {

        StudentResponse response = studentService.updateStudent(id, request);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student updated successfully",
                        response
                )
        );
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Activate/Deactivate Student")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudentStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        StudentResponse response = studentService.updateStudentStatus(id, active);
        String statusMessage = active ? "activated" : "deactivated";
        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student " + statusMessage + " successfully",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Student by ID")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(
            @PathVariable Long id) {

        StudentResponse response = studentService.getStudentById(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Student fetched successfully",
                        response
                )
        );
    }

    @GetMapping
    @Operation(summary = "Get All Students")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {

        List<StudentResponse> response = studentService.getAllStudents();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Students fetched successfully",
                        response
                )
        );
    }
}