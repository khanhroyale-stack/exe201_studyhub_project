package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.EkycStatus;
import com.management.studyhub.entity.enums.TutorStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

// TutorProfile.java
@Entity
@Table(name = "tutor_profiles") @Data
public class TutorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String fullName;
    private LocalDate birthDate;
    private String address;
    private String phoneNumber;
    private String avatarUrl;
    private String idCardFrontUrl;
    private String idCardBackUrl;
    private String universityName;
    private String major;
    private String degreeImageUrl;
    private int experienceYears;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String introduction;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TutorStatus status;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EkycStatus ekycStatus; // NOT_STARTED, PROCESSING, SUCCESS, FAILED
    private BigDecimal similarityScore;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String rejectionReason;

    private boolean isDeleted = false;

    private Double price;
    
    @Column(length = 20)
    private String teachingMethod; // ONLINE, OFFLINE, BOTH
    
    private Double averageRating = 0.0;
    private Integer totalReviews = 0;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "tutor_subjects",
        joinColumns = @JoinColumn(name = "tutor_profile_id"),
        inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects;
}
