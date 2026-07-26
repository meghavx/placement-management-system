package com.application.placementmanagementsystem.models;

import com.application.placementmanagementsystem.models.enums.Department;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "eligibility_criteria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EligibilityCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "drive_id", nullable = false, unique = true)
    private PlacementDrive placementDrive;

    @Column(name = "min_cgpa", nullable = false, precision = 4, scale = 2)
    private BigDecimal minCgpa;

    @Enumerated(EnumType.STRING)
    private Department department;

    @Column(name = "max_backlogs", nullable = false)
    private Integer maxBacklogs;

    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
