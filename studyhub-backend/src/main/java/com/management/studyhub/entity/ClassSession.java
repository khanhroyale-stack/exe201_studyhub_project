package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "class_sessions")
@Data
public class ClassSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Parent parent;

    // FK to TutorProfile — nullable so backward-compatible with String tutorName.
    // When parent side approves an application, they set this FK.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_profile_id", nullable = true)
    private TutorProfile tutorProfile;

    private String className;
    
    // String tutorName kept for backward-compatibility (used by seeder & display)
    private String tutorName;
    private String tutorAvatar;
    
    private String schedule;
    
    @Column(length = 20)
    private String status; // IN_PROGRESS, COMPLETED, CANCELLED
    
    private LocalDateTime nextSessionDate;
    
    private Integer progress;
}
