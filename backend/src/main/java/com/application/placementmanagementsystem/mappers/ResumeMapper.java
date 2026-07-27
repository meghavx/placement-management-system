package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.resume.ResumeResponse;
import com.application.placementmanagementsystem.models.Resume;
import org.springframework.stereotype.Component;

@Component
public class ResumeMapper {

    public ResumeResponse toResponse(Resume resume) {

        return ResumeResponse.builder()
                .id(resume.getId())
                .fileName(resume.getFileName())
                .uploadedAt(resume.getUploadedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}