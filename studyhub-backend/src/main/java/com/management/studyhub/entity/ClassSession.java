package com.management.studyhub.entity;

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

    private String className;
    
    // Instead of full relationships for now to match UI easily
    private String tutorName;
    private String tutorAvatar;
    
    private String schedule;
    
    @Column(length = 20)
    private String status; // IN_PROGRESS, COMPLETED, CANCELLED
    
    private LocalDateTime nextSessionDate;
    
    private Integer progress;
}
