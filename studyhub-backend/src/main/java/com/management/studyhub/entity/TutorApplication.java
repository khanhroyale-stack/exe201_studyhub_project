package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.ApplicationStatus;
import com.management.studyhub.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tutor_applications") @Data
public class TutorApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "tutor_id")
    private TutorProfile tutor;


    @ManyToOne @JoinColumn(name = "job_posting_id")
    private JobPosting jobPosting;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private UserRole senderRole; // Lưu ý: Dùng UserRole (PARENT/TUTOR) // TUTOR, PARENT
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ApplicationStatus status; // PENDING, ACCEPTED, REJECTED...

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();
    // Trong class TutorApplication.java
    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL)
    private List<StudyMaterial> studyMaterials;
}
