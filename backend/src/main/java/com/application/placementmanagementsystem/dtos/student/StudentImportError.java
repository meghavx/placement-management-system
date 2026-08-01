package com.application.placementmanagementsystem.dtos.student;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentImportError {

    private int row;

    private String message;
}