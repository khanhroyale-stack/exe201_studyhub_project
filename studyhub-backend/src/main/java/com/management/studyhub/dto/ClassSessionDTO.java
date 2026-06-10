package com.management.studyhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ClassSessionDTO {
    private Long id;
    private Long parentId;
    private String className;
    private String tutorName;
    private String tutorAvatar;
    private String schedule;
    private String status;
    private LocalDateTime nextSessionDate;
    private Integer progress;
}
