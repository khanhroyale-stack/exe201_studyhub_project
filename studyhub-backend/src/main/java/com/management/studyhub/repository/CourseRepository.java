package com.management.studyhub.repository;

import com.management.studyhub.entity.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c ORDER BY c.rating DESC, c.reviewCount DESC")
    List<Course> findFeaturedCourses(Pageable pageable);
}
