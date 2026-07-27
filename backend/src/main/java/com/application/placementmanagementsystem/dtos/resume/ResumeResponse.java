package com.application.placementmanagementsystem.dtos.resume;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ResumeResponse {

    private Long id;

    private String fileName;

    private LocalDateTime uploadedAt;

    private LocalDateTime updatedAt;
}