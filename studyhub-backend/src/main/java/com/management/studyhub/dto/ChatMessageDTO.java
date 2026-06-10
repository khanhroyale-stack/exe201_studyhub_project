package com.management.studyhub.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageDTO {
    private Long id;
    private Long classSessionId;
    private Long senderId;
    private String senderName;
    private String senderRole; // "Parent" hoặc "Tutor"
    private String messageContent;
    private LocalDateTime sentAt;
    private boolean isRead;
}
