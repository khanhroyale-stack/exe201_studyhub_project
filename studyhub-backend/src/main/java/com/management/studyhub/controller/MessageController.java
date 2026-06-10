package com.management.studyhub.controller;

import com.management.studyhub.entity.ChatMessage;
import com.management.studyhub.repository.ChatMessageRepository;
import com.management.studyhub.repository.TutorApplicationRepository;
import com.management.studyhub.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final ChatMessageRepository chatMessageRepository;
    private final TutorApplicationRepository tutorApplicationRepository;
    private final UserRepository userRepository;

    @Data
    public static class ChatMessageDTO {
        private Long id;
        private Long senderId;
        private String senderName;
        private String content;
        private String sentAt;
        private boolean isRead;
    }

    @Data
    public static class SendMessageRequest {
        private Long applicationId;
        private Long senderId; // In a real app, from SecurityContext
        private String content;
    }

    @GetMapping("/application/{appId}")
    public ResponseEntity<List<ChatMessageDTO>> getMessagesByApplication(@PathVariable Long appId) {
        List<ChatMessage> messages = chatMessageRepository.findByApplicationIdOrderBySentAtAsc(appId);
        List<ChatMessageDTO> dtos = messages.stream().map(m -> {
            ChatMessageDTO dto = new ChatMessageDTO();
            dto.setId(m.getId());
            dto.setSenderId(m.getSender() != null ? m.getSender().getId() : null);
            dto.setSenderName(m.getSender() != null ? m.getSender().getEmail() : "Unknown");
            dto.setContent(m.getMessageContent());
            dto.setSentAt(m.getSentAt() != null ? m.getSentAt().toString() : "");
            dto.setRead(m.isRead());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody SendMessageRequest request) {
        ChatMessage msg = new ChatMessage();
        msg.setApplication(tutorApplicationRepository.findById(request.getApplicationId()).orElseThrow());
        msg.setSender(userRepository.findById(request.getSenderId()).orElseThrow());
        msg.setMessageContent(request.getContent());
        msg.setSentAt(java.time.LocalDateTime.now());
        msg.setRead(false);
        msg = chatMessageRepository.save(msg);

        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setId(msg.getId());
        dto.setSenderId(msg.getSender().getId());
        dto.setSenderName(msg.getSender().getEmail());
        dto.setContent(msg.getMessageContent());
        dto.setSentAt(msg.getSentAt().toString());
        dto.setRead(msg.isRead());
        
        return ResponseEntity.ok(dto);
    }
}
