package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.LessonStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "lesson_logs") @Data
public class LessonLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "application_id", nullable = true)
    private TutorApplication application;

    @ManyToOne
    @JoinColumn(name = "class_session_id", nullable = true)
    private ClassSession classSession;

    private LocalDateTime scheduledDate;
    
    private java.time.LocalTime startTime;
    private java.time.LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LessonStatus status; // SCHEDULED, PRESENT, ABSENT, CANCELLED
}
