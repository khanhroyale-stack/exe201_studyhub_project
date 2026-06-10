package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reviews") @Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "application_id")
    private TutorApplication application;

    @ManyToOne @JoinColumn(name = "class_session_id")
    private ClassSession classSession;

    @ManyToOne @JoinColumn(name = "parent_id")
    private Parent parent;

    @ManyToOne @JoinColumn(name = "tutor_id")
    private TutorProfile tutor;

    private Integer rating; // 1-5 sao

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String comment;
}