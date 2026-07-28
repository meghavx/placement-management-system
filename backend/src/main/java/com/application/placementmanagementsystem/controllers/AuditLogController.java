package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.audit.AuditLogResponse;
import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    public ApiResponse<List<AuditLogResponse>> getAuditLogs() {

        return ResponseBuilder.success(
                "Audit logs retrieved successfully.",
                auditLogService.getAllAuditLogs()
        );
    }
}