package com.management.studyhub.dto.tutorportal;

import lombok.Data;

@Data
public class CreateCourseRequestDTO {
    private String title;
    private Integer subjectId;
    private String teachingMethod;
    private Double pricePerSession;
    private String description;
    private String image;
    private String schedule;
    private String location;
}
