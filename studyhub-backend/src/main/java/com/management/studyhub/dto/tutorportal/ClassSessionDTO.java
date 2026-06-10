package com.management.studyhub.dto.tutorportal;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ClassSessionDTO {
    private Long id;
    private String className;
    private String parentName;
    private String schedule;
    private String status;
    private LocalDateTime nextSessionDate;
    private Integer progress;
    private Double pricePerSession;
    private String learningMode;
    private String subject;
}
