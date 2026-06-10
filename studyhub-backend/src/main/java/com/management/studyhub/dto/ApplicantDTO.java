package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicantDTO {
    private Long id;
    private Long jobPostingId;
    private String tutorId;
    private String tutorName;
    private String tutorAvatar;
    private String tutorTitle;
    private Double tutorRating;
    private Integer tutorReviews;
    private String message;
    private String status; // PENDING, ACCEPTED, REJECTED
    private LocalDateTime appliedAt;

    // Thông tin bài đăng (cho gia sư xem đơn của mình)
    private String postTitle;
    private String postSubject;
    private String postClassLevel;
    private String postSchedule;
    private Double postPricePerSession;
    private String postLearningMode;
    private String postStatus;
}
