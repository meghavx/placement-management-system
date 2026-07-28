package com.application.placementmanagementsystem.services.audit;

import com.application.placementmanagementsystem.dtos.audit.AuditLogResponse;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;

import java.util.List;

public interface AuditLogService {

    void log(
            User user,
            AuditAction action,
            AuditEntityType entityType,
            Long entityId,
            String description
    );

    List<AuditLogResponse> getAllAuditLogs();
}