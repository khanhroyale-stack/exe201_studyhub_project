package com.management.studyhub.dto;

import lombok.Data;

@Data
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String locationType;
    private String price;
    private String image;
    private String schedule;
    
    // Convert to String for frontend compatibility
    private String rating; 
    private Integer reviewCount;

    // Tutor info
    private String tutorName;
    private String tutorDesc;
    private String tutorAvatar;
}
