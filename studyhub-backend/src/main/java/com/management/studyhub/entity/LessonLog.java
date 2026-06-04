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

    @ManyToOne @JoinColumn(name = "application_id")
    private TutorApplication application;

    private LocalDateTime scheduledDate;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LessonStatus status; // SCHEDULED, PRESENT, ABSENT, CANCELLED
}
