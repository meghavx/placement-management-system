package com.application.placementmanagementsystem.dtos.audit;

import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AuditLogResponse {

    private Long id;

    private Long userId;

    private String userName;

    private AuditAction action;

    private AuditEntityType entityType;

    private Long entityId;

    private String description;

    private String ipAddress;

    private LocalDateTime createdAt;
}