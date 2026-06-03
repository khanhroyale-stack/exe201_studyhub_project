package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đại diện cho Lớp học trong hệ thống StudyHub.
 */
@Entity
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status;

    private String tutorName;
}
