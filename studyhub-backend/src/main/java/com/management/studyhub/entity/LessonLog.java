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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_session_id")
    private ClassSession classSession;

    private LocalDateTime scheduledDate;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(columnDefinition = "TEXT")
    private String tutorFeedback;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private LessonStatus status; // SCHEDULED, PRESENT, ABSENT, CANCELLED
}
