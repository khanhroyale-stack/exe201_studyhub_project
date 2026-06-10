package com.management.studyhub.repository;

import com.management.studyhub.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.management.studyhub.entity.Parent;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByParent(Parent parent);
}
