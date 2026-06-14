package com.application.placementmanagementsystem.models;

import com.application.placementmanagementsystem.models.enums.Department;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "roll_number", nullable = false, unique = true)
    private String rollNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department;

    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal cgpa;

    @Column(name = "current_backlogs", nullable = false)
    private Integer currentBacklogs = 0;
}
