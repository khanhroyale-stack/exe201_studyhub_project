package com.management.studyhub.repository;

import com.management.studyhub.entity.LessonLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonLogRepository extends JpaRepository<LessonLog, Long> {
    List<LessonLog> findByClassSessionIdOrderByScheduledDateDesc(Long classSessionId);
}
