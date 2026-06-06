package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Data;


import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "tutor_requests") @Data
public class TutorRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "parent_id")
    private User parent;

    @ManyToOne @JoinColumn(name = "subject_id")
    private Subject subject;

    private String grade;
    private BigDecimal feePerSession;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String scheduleDetails;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RequestStatus status; // OPEN, CLOSED
    private boolean isDeleted = false;
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RequestSchedule> schedules;
}
