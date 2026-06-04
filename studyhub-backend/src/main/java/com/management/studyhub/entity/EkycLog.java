package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ekyc_logs") @Data
public class EkycLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "tutor_id")
    private TutorProfile tutor;

    private LocalDateTime requestTimestamp = LocalDateTime.now();
    private String avatarSnapshotUrl;
    private String idCardFrontSnapshotUrl;
    private BigDecimal similarityScore;
    private boolean isPassed;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String errorMessage;
}
