package com.management.studyhub.repository;

import com.management.studyhub.entity.DirectBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectBookingRepository extends JpaRepository<DirectBooking, Long> {
    List<DirectBooking> findByParentIdOrderByCreatedAtDesc(Long parentId);
    List<DirectBooking> findByTutorIdOrderByCreatedAtDesc(Long tutorId);
}
