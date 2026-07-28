package com.application.placementmanagementsystem.services.audit;

import com.application.placementmanagementsystem.auth.CustomUserPrincipal;
import com.application.placementmanagementsystem.dtos.audit.AuditLogResponse;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.AuditLogMapper;
import com.application.placementmanagementsystem.models.AuditLog;
import com.application.placementmanagementsystem.models.User;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.repositories.AuditLogRepository;
import com.application.placementmanagementsystem.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final AuditLogMapper auditLogMapper;

    @Override
    public void log(
            User user,
            AuditAction action,
            AuditEntityType entityType,
            Long entityId,
            String description
    ) {

        AuditLog auditLog = AuditLog.builder()
                .user(user)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .description(description)
                .build();

        auditLogRepository.save(auditLog);
    }

    @Override
    public List<AuditLogResponse> getAllAuditLogs() {

        return auditLogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(auditLogMapper::toResponse)
                .toList();
    }
}