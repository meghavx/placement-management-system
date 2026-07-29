package com.application.placementmanagementsystem.models;

import com.application.placementmanagementsystem.models.enums.ActivityMode;
import com.application.placementmanagementsystem.models.enums.RecruitmentActivityType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "recruitment_activities",
        indexes = {
                @Index(
                        name = "idx_recruitment_activity_drive_schedule",
                        columnList = "drive_id, scheduled_at"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drive_id", nullable = false)
    private PlacementDrive placementDrive;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false)
    private RecruitmentActivityType activityType;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityMode mode;

    private String venue;

    @Column(name = "meeting_link")
    private String meetingLink;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}