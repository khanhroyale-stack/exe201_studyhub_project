package com.management.studyhub.dto.tutorportal;

import lombok.Data;
import lombok.Data;

@Data
public class LessonScheduleDTO {
    private Long lessonId;
    private Long classId;
    private String className;
    private String parentName;
    private String date;
    private String startTime;
    private String endTime;
    private String status; // SCHEDULED, PRESENT, ABSENT, CANCELLED
    private String subject;
}
