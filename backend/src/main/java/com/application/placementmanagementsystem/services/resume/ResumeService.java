package com.application.placementmanagementsystem.services.resume;

import com.application.placementmanagementsystem.dtos.resume.ResumeResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse uploadResume(MultipartFile file);

    ResumeResponse getResume();

    byte[] downloadResume();

    ResumeResponse getStudentResume(Long id);

    byte[] downloadStudentResume(Long id);
}