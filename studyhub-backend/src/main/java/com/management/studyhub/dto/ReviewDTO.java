package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Long parentId;
    private String parentName;
    private String parentAvatar;
    private Long tutorId;
    private String tutorName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
