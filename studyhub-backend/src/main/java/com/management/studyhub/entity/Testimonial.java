package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
@Data
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private String role;
    
    @Column(columnDefinition = "TEXT")
    private String avatar;
    
    @Column(columnDefinition = "TEXT")
    private String quote;
    
    private Integer stars;

    private LocalDateTime createdAt = LocalDateTime.now();
}
