package com.management.studyhub.repository;

import com.management.studyhub.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByParentId(Long parentId);
    List<Enrollment> findByCourseTutorId(Long tutorId);
    List<Enrollment> findByCourseId(Long courseId);
}
