package com.management.studyhub.dto.parentportal;

import lombok.Data;

@Data
public class ParentFeedbackDTO {
    private Long id;
    private Long classId;
    private String className;
    private String tutorName;
    private Integer rating;
    private String comment;
    private String createdAt;
}
