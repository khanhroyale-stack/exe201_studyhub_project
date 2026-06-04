package com.management.studyhub.entity;

import com.management.studyhub.entity.enums.CommissionStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "commission_records") @Data
public class CommissionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "application_id")
    private TutorApplication application;

    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CommissionStatus status; // UNPAID, PAID
}