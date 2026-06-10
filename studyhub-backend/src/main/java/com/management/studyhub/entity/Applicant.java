package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "applicants")
@Data
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_posting_id")
    private JobPosting jobPosting;

    private String tutorId;
    private String tutorName;
    @Column(columnDefinition = "LONGTEXT")
    private String tutorAvatar;
    private String tutorTitle;
    
    private Double tutorRating;
    private Integer tutorReviews;
    
    @Column(length = 2000)
    private String message;
    
    private LocalDateTime appliedAt;
    
    @Column(length = 20)
    private String status; // PENDING, APPROVED, REJECTED
}
