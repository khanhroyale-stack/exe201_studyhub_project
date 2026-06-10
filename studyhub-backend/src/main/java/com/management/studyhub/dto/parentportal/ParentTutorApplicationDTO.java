package com.management.studyhub.dto.parentportal;

import lombok.Data;

@Data
public class ParentTutorApplicationDTO {
    private Long id;
    private Long tutorId;
    private String tutorName;
    private String tutorAvatar;
    private String tutorTitle;
    private Double tutorRating;
    private Integer tutorReviewCount;
    private String message;
    private String status;
    private String appliedAt;
}
