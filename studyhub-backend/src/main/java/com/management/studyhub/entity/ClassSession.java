package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.ClassSessionStatus;
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

    // Link to original job posting
    private Long postId;

    // Accepted applicant reference
    private Long acceptedApplicantId;

    // Tutor reference (TutorProfile.id)
    private Long tutorProfileId;

    private String className;
    private String subject;

    // Denormalized for easy display
    private String tutorName;
    @Column(columnDefinition = "LONGTEXT")
    private String tutorAvatar;
    private String parentName;

    private String schedule;

    @Column(length = 20)
    private String learningMode; // ONLINE, OFFLINE, BOTH

    private String address;
    private String meetingLink; // Link học online (Google Meet, Zoom, etc.)

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ClassSessionStatus status; // TRIAL, CONFIRMED, COMPLETED, CANCELLED, DISBURSED

    private Double price;
    private Double pricePerSession;

    private LocalDateTime createdAt;
    private LocalDateTime nextSessionDate;

    private Integer progress;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (progress == null) progress = 0;
    }
}
