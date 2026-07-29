package com.application.placementmanagementsystem.services.recruitmentactivity;

import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityRequest;
import com.application.placementmanagementsystem.dtos.recruitmentactivity.RecruitmentActivityResponse;
import com.application.placementmanagementsystem.exceptions.InvalidRequestException;
import com.application.placementmanagementsystem.exceptions.ResourceNotFoundException;
import com.application.placementmanagementsystem.mappers.RecruitmentActivityMapper;
import com.application.placementmanagementsystem.models.PlacementDrive;
import com.application.placementmanagementsystem.models.RecruitmentActivity;
import com.application.placementmanagementsystem.models.enums.ActivityMode;
import com.application.placementmanagementsystem.repositories.PlacementDriveRepository;
import com.application.placementmanagementsystem.repositories.RecruitmentActivityRepository;
import com.application.placementmanagementsystem.models.enums.AuditAction;
import com.application.placementmanagementsystem.models.enums.AuditEntityType;
import com.application.placementmanagementsystem.services.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitmentActivityServiceImpl implements RecruitmentActivityService {

    private final RecruitmentActivityRepository recruitmentActivityRepository;
    private final PlacementDriveRepository placementDriveRepository;
    private final RecruitmentActivityMapper recruitmentActivityMapper;
    private final AuditLogService auditLogService;

    @Override
    public RecruitmentActivityResponse createActivity(
            Long driveId,
            RecruitmentActivityRequest request
    ) {
        PlacementDrive placementDrive = getPlacementDrive(driveId);
        validateActivityDetails(request);
        RecruitmentActivity activity = RecruitmentActivity.builder()
                .placementDrive(placementDrive)
                .activityType(request.activityType())
                .title(request.title())
                .scheduledAt(request.scheduledAt())
                .mode(request.mode())
                .venue(request.venue())
                .meetingLink(request.meetingLink())
                .build();
        if (request.mode() == ActivityMode.ONLINE) {
            activity.setVenue(null);
        } else {
            activity.setMeetingLink(null);
        }
        RecruitmentActivity savedActivity = recruitmentActivityRepository.save(activity);

        auditLogService.log(
                AuditAction.CREATE,
                AuditEntityType.PLACEMENT_DRIVE,
                placementDrive.getId(),
                "Created recruitment activity '" + savedActivity.getTitle()
                        + "' for placement drive '" + placementDrive.getJobRole() + "'."
        );

        return recruitmentActivityMapper.toResponse(savedActivity);
    }

    @Override
    public RecruitmentActivityResponse updateActivity(
            Long driveId,
            Long activityId,
            RecruitmentActivityRequest request
    ) {
        PlacementDrive placementDrive = getPlacementDrive(driveId);
        RecruitmentActivity activity = recruitmentActivityRepository
                .findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Recruitment activity not found with id: " + activityId
                ));
        if (!activity.getPlacementDrive().getId().equals(placementDrive.getId())) {
            throw new ResourceNotFoundException(
                    "Recruitment activity not found for placement drive: " + driveId
            );
        }
        validateActivityDetails(request);
        activity.setActivityType(request.activityType());
        activity.setTitle(request.title());
        activity.setScheduledAt(request.scheduledAt());
        activity.setMode(request.mode());
        activity.setVenue(request.venue());
        activity.setMeetingLink(request.meetingLink());
        if (request.mode() == ActivityMode.ONLINE) {
            activity.setVenue(null);
        } else {
            activity.setMeetingLink(null);
        }
        RecruitmentActivity updatedActivity = recruitmentActivityRepository.save(activity);

        auditLogService.log(
                AuditAction.UPDATE,
                AuditEntityType.PLACEMENT_DRIVE,
                placementDrive.getId(),
                "Updated recruitment activity '" + updatedActivity.getTitle()
                        + "' for placement drive '" + placementDrive.getJobRole() + "'."
        );

        return recruitmentActivityMapper.toResponse(updatedActivity);
    }

    @Override
    public List<RecruitmentActivityResponse> getActivitiesByDrive(Long driveId) {
        getPlacementDrive(driveId);
        return recruitmentActivityRepository
                .findByPlacementDriveIdOrderByScheduledAtAsc(driveId)
                .stream()
                .map(recruitmentActivityMapper::toResponse)
                .toList();
    }

    // Private Helper Methods

    private PlacementDrive getPlacementDrive(Long driveId) {
        return placementDriveRepository.findById(driveId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Placement drive not found with id: " + driveId
                ));
    }

    private void validateActivityDetails(RecruitmentActivityRequest request) {
        if (request.mode() == ActivityMode.OFFLINE &&
                (request.venue() == null || request.venue().isBlank())
        ) {
            throw new InvalidRequestException(
                    "Venue is required for offline recruitment activities"
            );
        }

        if (request.mode() == ActivityMode.ONLINE &&
                (request.meetingLink() == null ||
                        request.meetingLink().isBlank())
        ) {
            throw new InvalidRequestException(
                    "Meeting link is required for online recruitment activities"
            );
        }
    }
}