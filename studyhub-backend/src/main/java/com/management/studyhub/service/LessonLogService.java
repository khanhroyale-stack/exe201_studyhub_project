package com.management.studyhub.service;

import com.management.studyhub.dto.LessonLogDTO;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.LessonLog;
import com.management.studyhub.entity.enums.LessonStatus;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.LessonLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonLogService {

    private final LessonLogRepository lessonLogRepository;
    private final ClassSessionRepository classSessionRepository;

    public List<LessonLogDTO> getLessonLogsByClassSessionId(Long classSessionId) {
        return lessonLogRepository.findByClassSessionIdOrderByScheduledDateDesc(classSessionId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public LessonLogDTO createLessonLog(Long classSessionId, LessonLogDTO dto) {
        ClassSession session = classSessionRepository.findById(classSessionId)
                .orElseThrow(() -> new RuntimeException("ClassSession not found"));

        // Validate status
        if (session.getStatus() == com.management.studyhub.entity.enums.ClassSessionStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Lớp học đang chờ phụ huynh thanh toán học phí. Không thể thêm nhật ký buổi học mới.");
        }
        
        if (session.getStatus() == com.management.studyhub.entity.enums.ClassSessionStatus.TRIAL) {
            long trialCount = lessonLogRepository.countByClassSessionId(classSessionId);
            if (trialCount >= 2) {
                throw new RuntimeException("Lớp học đã kết thúc 2 buổi học thử. Vui lòng yêu cầu phụ huynh Xác nhận thuê & Thanh toán để tiếp tục.");
            }
        }

        if (session.getStatus() == com.management.studyhub.entity.enums.ClassSessionStatus.COMPLETED || 
            session.getStatus() == com.management.studyhub.entity.enums.ClassSessionStatus.DISBURSED || 
            session.getStatus() == com.management.studyhub.entity.enums.ClassSessionStatus.CANCELLED) {
            throw new RuntimeException("Lớp học đã kết thúc hoặc đã hủy. Không thể thêm nhật ký mới.");
        }

        LessonLog log = new LessonLog();
        log.setClassSession(session);
        log.setTitle(dto.getTitle());
        log.setContent(dto.getContent());
        log.setTutorFeedback(dto.getTutorFeedback());
        log.setScheduledDate(dto.getScheduledDate());
        log.setStatus(dto.getStatus() != null ? LessonStatus.valueOf(dto.getStatus()) : LessonStatus.PRESENT);

        LessonLog saved = lessonLogRepository.save(log);

        // Update class progress implicitly
        session.setProgress(session.getProgress() + 1);
        classSessionRepository.save(session);

        return mapToDTO(saved);
    }

    private LessonLogDTO mapToDTO(LessonLog log) {
        LessonLogDTO dto = new LessonLogDTO();
        dto.setId(log.getId());
        dto.setClassSessionId(log.getClassSession() != null ? log.getClassSession().getId() : null);
        dto.setTitle(log.getTitle());
        dto.setContent(log.getContent());
        dto.setTutorFeedback(log.getTutorFeedback());
        dto.setScheduledDate(log.getScheduledDate());
        dto.setStatus(log.getStatus() != null ? log.getStatus().name() : null);
        return dto;
    }
}
