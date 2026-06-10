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

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "class_session_id")
    private ClassSession classSession;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "sender_id")
    private User sender;

    @Column(columnDefinition = "TEXT")
    private String messageContent;

    private LocalDateTime sentAt = LocalDateTime.now();
    private boolean isRead = false;
}