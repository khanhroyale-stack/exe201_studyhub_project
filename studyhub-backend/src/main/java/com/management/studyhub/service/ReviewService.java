package com.management.studyhub.service;

import com.management.studyhub.dto.ReviewDTO;
import com.management.studyhub.entity.ParentFeedback;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.repository.ParentFeedbackRepository;
import com.management.studyhub.repository.ClassSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ParentFeedbackRepository reviewRepository;
    private final ClassSessionRepository classSessionRepository;

    public ReviewDTO createReview(ReviewDTO dto) {
        // Assume tutorId passed in DTO is the ClassSession id for now, 
        // since the UI doesn't have proper mapping yet. We'll find a random ClassSession for this parent.
        List<ClassSession> sessions = classSessionRepository.findByParentId(dto.getParentId());
        if (sessions.isEmpty()) {
            throw new RuntimeException("No class sessions found for parent to review");
        }
        ClassSession session = sessions.get(0); // Just grab the first one to satisfy the DB constraint

        ParentFeedback review = new ParentFeedback();
        review.setClassSession(session);
        review.setTutorId(String.valueOf(dto.getTutorId()));
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        ParentFeedback saved = reviewRepository.save(review);
        return mapToDTO(saved);
    }

    public List<ReviewDTO> getReviewsByParent(Long parentId) {
        return reviewRepository.findByParentId(parentId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private ReviewDTO mapToDTO(ParentFeedback review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setParentId(review.getClassSession().getParent().getId());
        dto.setParentName(review.getClassSession().getParent().getName());
        dto.setParentAvatar(review.getClassSession().getParent().getAvatar());
        try {
            dto.setTutorId(Long.parseLong(review.getTutorId()));
        } catch (NumberFormatException e) {
            dto.setTutorId(0L);
        }
        dto.setTutorName(review.getClassSession().getTutorName());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
