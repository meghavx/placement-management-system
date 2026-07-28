package com.application.placementmanagementsystem.controllers;

import com.application.placementmanagementsystem.common.ResponseBuilder;
import com.application.placementmanagementsystem.dtos.audit.AuditLogResponse;
import com.application.placementmanagementsystem.common.ApiResponse;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/audit-logs")
@Tag(name = "Audit Logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    @Operation(summary = "Get Audit Logs")
    public ApiResponse<List<AuditLogResponse>> getAuditLogs() {

        return ResponseBuilder.success(
                "Audit logs retrieved successfully.",
                auditLogService.getAllAuditLogs()
        );
    }
}