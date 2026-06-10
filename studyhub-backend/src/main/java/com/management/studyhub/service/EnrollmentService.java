package com.management.studyhub.service;

import com.management.studyhub.dto.EnrollmentDto;
import com.management.studyhub.dto.EnrollmentRequestDto;

import java.util.List;

public interface EnrollmentService {
    EnrollmentDto createEnrollment(Long parentId, EnrollmentRequestDto requestDto);
    List<EnrollmentDto> getEnrollmentsByParentId(Long parentId);
    List<EnrollmentDto> getEnrollmentsByTutorId(Long tutorId);
    EnrollmentDto approveEnrollment(Long id);
    EnrollmentDto rejectEnrollment(Long id);
}
