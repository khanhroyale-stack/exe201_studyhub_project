package com.studyhub.api.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity đại diện cho Gia sư trong hệ thống StudyHub.
 */
@Entity
@Table(name = "tutors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String specializedSubject;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private Double rating;

    private String avatarUrl;
}
