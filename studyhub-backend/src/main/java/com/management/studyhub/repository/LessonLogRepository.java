package com.management.studyhub.repository;

import com.management.studyhub.entity.LessonLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LessonLogRepository extends JpaRepository<LessonLog, Long> {
    List<LessonLog> findByClassSession_TutorProfile_FullNameAndScheduledDateBetween(String tutorName, LocalDateTime start, LocalDateTime end);
    List<LessonLog> findByClassSession_TutorNameAndScheduledDateBetween(String tutorName, LocalDateTime start, LocalDateTime end);
}
