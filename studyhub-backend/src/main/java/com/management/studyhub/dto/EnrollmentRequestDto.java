package com.management.studyhub.dto;

import lombok.Data;

@Data
public class EnrollmentRequestDto {
    private Long courseId;
    private String studentName;
    private String studentGrade;
    private String studentLevel;
    private String notes;
}
