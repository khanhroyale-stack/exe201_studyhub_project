package com.management.studyhub.repository;

import com.management.studyhub.entity.TutorApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.management.studyhub.entity.JobPosting;

@Repository
public interface TutorApplicationRepository extends JpaRepository<TutorApplication, Long> {
    List<TutorApplication> findByJobPosting(JobPosting jobPosting);
}
