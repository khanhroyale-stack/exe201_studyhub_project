package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EnrollmentDto {
    private Long id;
    private Long parentId;
    private String parentName;
    private Long courseId;
    private String courseTitle;
    private String tutorName;
    private String studentName;
    private String studentGrade;
    private String studentLevel;
    private String notes;
    private String status;
    private LocalDateTime createdAt;
    
    // Additional fields for frontend display
    private String courseImage;
    private String courseSchedule;
    private String courseTime; // mapping from some field if available, else generic
    private String tutorAvatar;
}
