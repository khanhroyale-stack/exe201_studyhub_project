package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JobPostingDTO {
    private Long id;
    private Long parentId;
    private String parentName;
    private String parentAvatar;
    private String title;
    private String subject;
    private String description;
    private LocalDateTime postedAt;
    private String status;
    private String location;
    private String schedule;
    private String tutorGenderPreference;
    private Double pricePerSession;
    private Integer applicantsCount;
    private String learningMode;
    private String requirement;
}
