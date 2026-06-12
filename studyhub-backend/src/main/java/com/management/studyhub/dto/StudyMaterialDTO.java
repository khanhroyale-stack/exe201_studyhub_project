package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StudyMaterialDTO {
    private Long id;
    private Long classSessionId;
    private Long uploaderId;
    private String uploaderName;
    private Long subjectId;
    private String subjectName;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Boolean isPublic;
    private LocalDateTime uploadedAt;
}
