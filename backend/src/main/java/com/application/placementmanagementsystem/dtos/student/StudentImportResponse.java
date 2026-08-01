package com.application.placementmanagementsystem.dtos.student;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StudentImportResponse {

    private int total;

    private int created;

    private int failed;

    private List<StudentImportError> errors;
}