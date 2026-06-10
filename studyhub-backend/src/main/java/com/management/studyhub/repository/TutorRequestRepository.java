package com.management.studyhub.repository;

import com.management.studyhub.entity.TutorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRequestRepository extends JpaRepository<TutorRequest, Long> {
}
