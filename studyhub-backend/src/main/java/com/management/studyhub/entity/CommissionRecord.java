package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "commission_records") @Data
public class CommissionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    private Double totalAmount;
    private Double platformFee;
    private Double tutorPayout;

    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();
}