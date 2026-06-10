package com.management.studyhub.service;

import com.management.studyhub.dto.ClassSessionDTO;
import com.management.studyhub.entity.Applicant;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.JobPosting;
import com.management.studyhub.entity.enums.ClassSessionStatus;
import com.management.studyhub.repository.ApplicantRepository;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.JobPostingRepository;
import com.management.studyhub.repository.ParentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassSessionService {

    private final ClassSessionRepository classSessionRepository;
    private final ApplicantRepository applicantRepository;
    private final JobPostingRepository jobPostingRepository;
    private final ParentRepository parentRepository;

    /**
     * Phụ huynh chấp nhận 1 ứng viên:
     *  1. Applicant → ACCEPTED
     *  2. Các Applicant khác cùng post → REJECTED
     *  3. JobPosting → CLOSED
     *  4. Tạo ClassSession mới (status = TRIAL)
     */
    @Transactional
    public ClassSessionDTO acceptApplicant(Long applicantId) {
        // 1. Lấy applicant được chọn
        Applicant accepted = applicantRepository.findById(applicantId)
                .orElseThrow(() -> new RuntimeException("Applicant not found: " + applicantId));

        JobPosting post = accepted.getJobPosting();
        if (post == null) throw new RuntimeException("JobPosting not found for applicant");

        // 2. Từ chối tất cả applicant khác cùng bài đăng
        List<Applicant> allApplicants = applicantRepository.findByJobPostingId(post.getId());
        for (Applicant a : allApplicants) {
            if (a.getId().equals(applicantId)) {
                a.setStatus("ACCEPTED");
            } else if ("PENDING".equals(a.getStatus())) {
                a.setStatus("REJECTED");
            }
        }
        applicantRepository.saveAll(allApplicants);

        // 3. Đóng bài đăng
        post.setStatus("CLOSED");
        jobPostingRepository.save(post);

        // 4. Tạo ClassSession mới
        ClassSession session = new ClassSession();
        session.setPostId(post.getId());
        session.setAcceptedApplicantId(applicantId);
        session.setClassName(post.getTitle());
        session.setSubject(post.getSubject());
        session.setSchedule(post.getSchedule());
        session.setLearningMode(post.getLearningMode());
        session.setAddress(post.getDetailedAddress());
        session.setPricePerSession(post.getPricePerSession());
        session.setStatus(ClassSessionStatus.TRIAL);
        session.setProgress(0);
        session.setTutorName(accepted.getTutorName());
        session.setTutorAvatar(accepted.getTutorAvatar());

        // Gắn parent
        if (post.getParent() != null) {
            session.setParent(post.getParent());
            session.setParentName(
                post.getParent().getUser() != null
                    ? post.getParent().getUser().getFullName()
                    : post.getParent().getName()
            );
        }

        // Parse tutorProfileId từ string tutorId
        try {
            session.setTutorProfileId(Long.parseLong(accepted.getTutorId()));
        } catch (NumberFormatException ignored) { }

        ClassSession saved = classSessionRepository.save(session);
        return mapToDTO(saved);
    }

    /**
     * Lấy danh sách lớp học của phụ huynh
     */
    public List<ClassSessionDTO> getSessionsByParent(Long userId) {
        com.management.studyhub.entity.Parent parent = parentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Parent not found for user: " + userId));

        return classSessionRepository.findByParentId(parent.getId())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ClassSessionDTO> getSessionsByTutor(Long tutorProfileId) {
        return classSessionRepository.findByTutorProfileId(tutorProfileId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ClassSessionDTO getSessionById(Long id) {
        ClassSession session = classSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ClassSession not found"));
        return mapToDTO(session);
    }

    @Transactional
    public ClassSessionDTO updateMeetingLink(Long id, String link) {
        ClassSession session = classSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ClassSession not found"));
        session.setMeetingLink(link);
        return mapToDTO(classSessionRepository.save(session));
    }

    @Transactional
    public ClassSessionDTO updateAddress(Long id, String address) {
        ClassSession session = classSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ClassSession not found"));
        session.setAddress(address);
        return mapToDTO(classSessionRepository.save(session));
    }

    /**
     * Cập nhật trạng thái lớp học
     * Các trạng thái hợp lệ: CONFIRMED, COMPLETED, CANCELLED, DISBURSED
     */
    @Transactional
    public ClassSessionDTO updateStatus(Long sessionId, String newStatus) {
        ClassSession session = classSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("ClassSession not found: " + sessionId));
        try {
            session.setStatus(ClassSessionStatus.valueOf(newStatus.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + newStatus);
        }
        return mapToDTO(classSessionRepository.save(session));
    }

    /**
     * Phụ huynh từ chối 1 ứng viên cụ thể
     */
    @Transactional
    public void rejectApplicant(Long applicantId) {
        Applicant applicant = applicantRepository.findById(applicantId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ứng viên"));
        applicant.setStatus("REJECTED");
        applicantRepository.save(applicant);
    }

    // ── Mapper ──────────────────────────────────────────────────────────────

    private ClassSessionDTO mapToDTO(ClassSession s) {
        ClassSessionDTO dto = new ClassSessionDTO();
        dto.setId(s.getId());
        dto.setPostId(s.getPostId());
        dto.setTutorProfileId(s.getTutorProfileId());
        dto.setTutorName(s.getTutorName());
        dto.setTutorAvatar(s.getTutorAvatar());
        dto.setClassName(s.getClassName());
        dto.setSubject(s.getSubject());
        dto.setSchedule(s.getSchedule());
        dto.setLearningMode(s.getLearningMode());
        dto.setAddress(s.getAddress());
        dto.setMeetingLink(s.getMeetingLink());
        dto.setStatus(s.getStatus() != null ? s.getStatus().name() : null);
        dto.setPricePerSession(s.getPricePerSession());
        dto.setProgress(s.getProgress());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setNextSessionDate(s.getNextSessionDate());

        if (s.getParent() != null) {
            dto.setParentId(s.getParent().getId());
            dto.setParentName(s.getParentName());
        }

        return dto;
    }
}
