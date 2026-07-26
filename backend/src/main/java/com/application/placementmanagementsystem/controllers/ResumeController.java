package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.resume.ResumeResponse;
import com.application.placementmanagementsystem.services.resume.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/student/profile/resume")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
@Tag(name = "Resume Management")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload / Replace Resume")
    public ResponseEntity<ApiResponse<ResumeResponse>> uploadResume(
            @RequestParam("file") MultipartFile file
    ) {

        ResumeResponse response = resumeService.uploadResume(file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ResponseBuilder.success(
                                "Resume uploaded successfully",
                                response
                        )
                );
    }

    @GetMapping
    @Operation(summary = "View Resume Details")
    public ResponseEntity<ApiResponse<ResumeResponse>> getResume() {

        ResumeResponse response = resumeService.getResume();

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Resume fetched successfully",
                        response
                )
        );
    }

    @GetMapping("/download")
    @Operation(summary = "Download Resume")
    public ResponseEntity<ByteArrayResource> downloadResume() {

        byte[] file = resumeService.downloadResume();

        String fileName = resumeService.getResume().getFileName();

        ByteArrayResource resource = new ByteArrayResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(fileName)
                                .build()
                                .toString()
                )
                .contentLength(file.length)
                .body(resource);
    }
}