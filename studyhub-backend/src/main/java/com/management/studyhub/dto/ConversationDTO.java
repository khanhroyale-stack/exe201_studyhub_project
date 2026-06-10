package com.management.studyhub.dto;

import lombok.Data;

@Data
public class ConversationDTO {
    private Long classSessionId;
    private String className;
    private Long partnerId; // userId của người đang chat cùng
    private String partnerName;
    private String partnerAvatar;
    private String partnerRole; // "Parent" hoặc "Tutor"
    private String lastMessage;
    private String lastMessageTime;
    private int unreadCount;
    private boolean online; // Mặc định false (có thể mở rộng sau)
}
