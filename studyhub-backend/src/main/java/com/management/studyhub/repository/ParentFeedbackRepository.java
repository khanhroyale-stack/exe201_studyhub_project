package com.management.studyhub.repository;

import com.management.studyhub.entity.ParentFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentFeedbackRepository extends JpaRepository<ParentFeedback, Long> {
    @Query("SELECT p FROM ParentFeedback p WHERE p.classSession.parent.id = :parentId")
    List<ParentFeedback> findByParentId(@Param("parentId") Long parentId);
}
