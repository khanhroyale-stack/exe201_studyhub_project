package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages") @Data
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "application_id")
    private TutorApplication application;

    @ManyToOne @JoinColumn(name = "sender_id")
    private User sender;

    @Column(columnDefinition = "TEXT") // Sửa NVARCHAR(MAX) thành TEXT
    private String messageContent;

    private LocalDateTime sentAt = LocalDateTime.now();
    private boolean isRead = false;
}