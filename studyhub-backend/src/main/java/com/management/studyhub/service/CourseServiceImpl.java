package com.management.studyhub.service;

import com.management.studyhub.dto.CourseDto;
import com.management.studyhub.entity.Course;
import com.management.studyhub.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public List<CourseDto> getFeaturedCourses() {
        // Fetch top 6 courses sorted by rating and review count
        List<Course> courses = courseRepository.findFeaturedCourses(PageRequest.of(0, 6));
        
        return courses.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private CourseDto mapToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setLocation(course.getLocation());
        dto.setLocationType(course.getLocationType());
        dto.setPrice(course.getPrice());
        dto.setImage(course.getImage());
        dto.setSchedule(course.getSchedule());
        
        // Format rating
        if (course.getRating() != null) {
            dto.setRating(String.format("%.1f", course.getRating()));
        } else {
            dto.setRating("0.0");
        }
        dto.setReviewCount(course.getReviewCount() != null ? course.getReviewCount() : 0);

        if (course.getTutor() != null) {
            dto.setTutorName(course.getTutor().getFullName());
            dto.setTutorDesc(course.getTutor().getIntroduction());
            dto.setTutorAvatar(course.getTutor().getAvatarUrl());
        }

        return dto;
    }
}
