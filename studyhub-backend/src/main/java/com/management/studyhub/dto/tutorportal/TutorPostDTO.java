package com.management.studyhub.dto.tutorportal;

import lombok.Data;

@Data
public class TutorPostDTO {
    private Long id;
    private String title;
    private String subjectName;
    private String teachingMethod;
    private String price;
    private String description;
    private String image;
    private Double rating;
    private Integer reviewCount;
    private String schedule;
    private String location;
}
