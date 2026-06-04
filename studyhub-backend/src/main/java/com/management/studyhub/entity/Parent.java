package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "parents")
@Data
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String name;
    private String email;
    private String phone;
    private String avatar;
    
    private Double budgetSpentThisMonth;
    private Integer classesWaiting;
}
