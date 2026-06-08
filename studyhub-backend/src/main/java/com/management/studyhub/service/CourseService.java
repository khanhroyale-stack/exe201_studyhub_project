package com.management.studyhub.service;

import com.management.studyhub.dto.CourseDto;

import java.util.List;

public interface CourseService {
    List<CourseDto> getFeaturedCourses();
    List<CourseDto> getAllCourses();
}
