package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Data
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    private String studentName;
    private String studentGrade;
    private String studentLevel;
    
    @Column(columnDefinition = "TEXT")
    private String notes;

    // Status can be: PENDING, APPROVED, REJECTED
    private String status;

    private LocalDateTime createdAt = LocalDateTime.now();
}
