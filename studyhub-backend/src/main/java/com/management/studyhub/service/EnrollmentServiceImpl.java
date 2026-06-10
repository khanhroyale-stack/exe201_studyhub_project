package com.management.studyhub.service;

import com.management.studyhub.dto.EnrollmentDto;
import com.management.studyhub.dto.EnrollmentRequestDto;
import com.management.studyhub.entity.Course;
import com.management.studyhub.entity.Enrollment;
import com.management.studyhub.entity.User;
import com.management.studyhub.repository.CourseRepository;
import com.management.studyhub.repository.EnrollmentRepository;
import com.management.studyhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    public EnrollmentDto createEnrollment(Long parentId, EnrollmentRequestDto requestDto) {
        User parent = userRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        Course course = courseRepository.findById(requestDto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setParent(parent);
        enrollment.setCourse(course);
        enrollment.setStudentName(requestDto.getStudentName());
        enrollment.setStudentGrade(requestDto.getStudentGrade());
        enrollment.setStudentLevel(requestDto.getStudentLevel());
        enrollment.setNotes(requestDto.getNotes());
        enrollment.setStatus("PENDING");

        return mapToDto(enrollmentRepository.save(enrollment));
    }

    @Override
    public List<EnrollmentDto> getEnrollmentsByParentId(Long parentId) {
        return enrollmentRepository.findByParentId(parentId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EnrollmentDto> getEnrollmentsByTutorId(Long tutorId) {
        return enrollmentRepository.findByCourseTutorId(tutorId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EnrollmentDto approveEnrollment(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus("APPROVED");
        return mapToDto(enrollmentRepository.save(enrollment));
    }

    @Override
    public EnrollmentDto rejectEnrollment(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus("REJECTED");
        return mapToDto(enrollmentRepository.save(enrollment));
    }

    private EnrollmentDto mapToDto(Enrollment enrollment) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(enrollment.getId());
        if (enrollment.getParent() != null) {
            dto.setParentId(enrollment.getParent().getId());
            dto.setParentName(enrollment.getParent().getFullName());
        }
        if (enrollment.getCourse() != null) {
            dto.setCourseId(enrollment.getCourse().getId());
            dto.setCourseTitle(enrollment.getCourse().getTitle());
            dto.setCourseImage(enrollment.getCourse().getImage());
            dto.setCourseSchedule(enrollment.getCourse().getSchedule());
            dto.setCourseTime(enrollment.getCourse().getSchedule()); // fallback
            
            if (enrollment.getCourse().getTutor() != null) {
                dto.setTutorName(enrollment.getCourse().getTutor().getFullName());
                dto.setTutorAvatar(enrollment.getCourse().getTutor().getAvatarUrl());
            }
        }
        dto.setStudentName(enrollment.getStudentName());
        dto.setStudentGrade(enrollment.getStudentGrade());
        dto.setStudentLevel(enrollment.getStudentLevel());
        dto.setNotes(enrollment.getNotes());
        dto.setStatus(enrollment.getStatus());
        dto.setCreatedAt(enrollment.getCreatedAt());
        return dto;
    }
}
