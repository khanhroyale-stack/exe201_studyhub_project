package com.management.studyhub.dto.tutorportal;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JobPostingDTO {
    private Long id;
    private String title;
    private String subject;
    private String learningMode;
    private String location;
    private String schedule;
    private Double pricePerSession;
    private String parentName;
    private String parentAvatar;
    private LocalDateTime postedAt;
    private String status;
    private Integer applicantsCount;
    private String requirement;
}
