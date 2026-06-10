package com.management.studyhub.repository;

import com.management.studyhub.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByApplicationIdOrderBySentAtAsc(Long applicationId);
    List<ChatMessage> findBySenderId(Long senderId);
}
