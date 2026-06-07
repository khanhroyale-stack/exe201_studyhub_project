package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "courses")
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String location;
    private String locationType;
    private String price;
    private String image;
    private String schedule;

    private Double rating;
    private Integer reviewCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id")
    private TutorProfile tutor;
}
