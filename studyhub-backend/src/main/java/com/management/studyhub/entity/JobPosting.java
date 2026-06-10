package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_postings")
@Data
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Parent parent;

    private String title;
    private String subject;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private LocalDateTime postedAt;
    
    @Column(length = 20)
    private String status; // RECRUITING, CLOSED, PRIORITY
    
    private String location;
    private String schedule;
    
    @Column(length = 20)
    private String tutorGenderPreference; // MALE, FEMALE, ANY
    
    private Double pricePerSession;
    private Integer applicantsCount;
    
    @Column(length = 20)
    private String learningMode; // ONLINE, OFFLINE
    
    @Column(columnDefinition = "TEXT")
    private String requirement;

    private Boolean isDirectInvite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_tutor_id")
    private TutorProfile targetTutor;
}
