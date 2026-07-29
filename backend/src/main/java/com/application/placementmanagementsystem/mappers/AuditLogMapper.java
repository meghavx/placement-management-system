package com.application.placementmanagementsystem.mappers;

import com.application.placementmanagementsystem.dtos.audit.AuditLogResponse;
import com.application.placementmanagementsystem.models.AuditLog;
import org.springframework.stereotype.Component;

@Component
public class AuditLogMapper {

    public AuditLogResponse toResponse(AuditLog auditLog) {

        return AuditLogResponse.builder()
                .id(auditLog.getId())
                .userId(auditLog.getUser().getId())
                .userName(auditLog.getUser().getFullName())
                .action(auditLog.getAction())
                .entityType(auditLog.getEntityType())
                .entityId(auditLog.getEntityId())
                .description(auditLog.getDescription())
                .ipAddress(auditLog.getIpAddress())
                .createdAt(auditLog.getCreatedAt())
                .build();
    }
}