package com.application.placementmanagementsystem.services.resume;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.resume.ResumeResponse;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.ResumeMapper;
import com.application.placementmanagementsystem.models.Resume;
import com.application.placementmanagementsystem.models.Student;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.repositories.ResumeRepository;
import com.application.placementmanagementsystem.repositories.StudentRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class ResumeServiceImpl implements ResumeService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private final ResumeRepository resumeRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ResumeMapper resumeMapper;

    /**
     * Returns the currently authenticated student.
     */
    private Student getAuthenticatedStudent() {

        CustomUserPrincipal principal =
                (CustomUserPrincipal) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );

        return studentRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found.")
                );
    }

    @Override
    public ResumeResponse uploadResume(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Maximum allowed file size is 5 MB.");
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null || !fileName.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF files are supported.");
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException("Invalid file type. Only PDF files are allowed.");
        }

        Student student = getAuthenticatedStudent();

        Resume resume = resumeRepository.findByStudent(student)
                .orElse(
                        Resume.builder()
                                .student(student)
                                .build()
                );

        try {
            resume.setFileName(fileName);
            resume.setFile(file.getBytes());
        } catch (IOException e) {
            throw new IllegalArgumentException("Unable to read uploaded file.");
        }

        Resume savedResume = resumeRepository.save(resume);

        return resumeMapper.toResponse(savedResume);
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse getResume() {

        Student student = getAuthenticatedStudent();

        Resume resume = resumeRepository.findByStudent(student)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found.")
                );

        return resumeMapper.toResponse(resume);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadResume() {

        Student student = getAuthenticatedStudent();

        Resume resume = resumeRepository.findByStudent(student)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found.")
                );

        return resume.getFile();
    }
}