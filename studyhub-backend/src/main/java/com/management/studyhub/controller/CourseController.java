package com.management.studyhub.controller;

import com.management.studyhub.dto.CourseDto;
import com.management.studyhub.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/featured")
    public ResponseEntity<List<CourseDto>> getFeaturedCourses() {
        return ResponseEntity.ok(courseService.getFeaturedCourses());
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String subjects,
            @RequestParam(required = false) String grades,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String method
    ) {
        return ResponseEntity.ok(courseService.getAllCourses(keyword, subjects, grades, maxPrice, method));
    }
}
