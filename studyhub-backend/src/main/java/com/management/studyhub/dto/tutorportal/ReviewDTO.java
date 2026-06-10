package com.management.studyhub.dto.tutorportal;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private String parentName;
    private String parentAvatar;
    private Integer rating;
    private String comment;
    private String className;
    private LocalDateTime createdAt;
}
