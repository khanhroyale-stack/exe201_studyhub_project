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
    public List<CourseDto> getAllCourses(List<Integer> subjectIds, Double maxPrice, String teachingMethod, List<String> grades, String keyword) {
        List<Course> courses;
        if (subjectIds != null && !subjectIds.isEmpty()) {
            courses = courseRepository.findBySubjectIdIn(subjectIds);
        } else {
            courses = courseRepository.findAll();
        }

        return courses.stream()
            .filter(c -> {
                if (maxPrice != null) {
                    String priceStr = c.getPrice() != null ? c.getPrice().replaceAll("[^0-9]", "") : "";
                    if (!priceStr.isEmpty()) {
                        try {
                            double price = Double.parseDouble(priceStr);
                            if (price > maxPrice) return false;
                        } catch (Exception ignored) {}
                    }
                }
                if (teachingMethod != null && !teachingMethod.isEmpty() && !teachingMethod.equalsIgnoreCase("ALL")) {
                    boolean isOnline = "computer".equals(c.getLocationType()) || "videocam".equals(c.getLocationType()) || "Online".equalsIgnoreCase(c.getLocationType());
                    if (teachingMethod.equalsIgnoreCase("ONLINE") && !isOnline) return false;
                    if (teachingMethod.equalsIgnoreCase("OFFLINE") && isOnline) return false;
                }
                if (grades != null && !grades.isEmpty()) {
                    boolean matchGrade = false;
                    String title = c.getTitle() != null ? c.getTitle().toLowerCase() : "";
                    String desc = c.getDescription() != null ? c.getDescription().toLowerCase() : "";
                    for (String grade : grades) {
                        String g = grade.toLowerCase();
                        String gradeNumber = g.replaceAll("[^0-9]", "");
                        if (!gradeNumber.isEmpty()) {
                            if (title.contains(gradeNumber) || desc.contains(gradeNumber)) {
                                matchGrade = true;
                                break;
                            }
                        } else {
                            if (title.contains(g) || desc.contains(g)) {
                                matchGrade = true;
                                break;
                            }
                        }
                    }
                    if (!matchGrade) return false;
                }
                if (keyword != null && !keyword.trim().isEmpty()) {
                    String title = c.getTitle() != null ? c.getTitle().toLowerCase() : "";
                    String subjectName = c.getSubject() != null ? c.getSubject().getName().toLowerCase() : "";
                    String kw = keyword.toLowerCase().trim();
                    if (!title.contains(kw) && !subjectName.contains(kw)) return false;
                }
                return true;
            })
            .map(this::mapToDto)
            .collect(Collectors.toList());
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

        if (course.getSubject() != null) {
            dto.setSubjectId(course.getSubject().getId());
            dto.setSubjectName(course.getSubject().getName());
        }

        return dto;
    }
}
