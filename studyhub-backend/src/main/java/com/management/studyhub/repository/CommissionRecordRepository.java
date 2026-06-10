package com.management.studyhub.repository;

import com.management.studyhub.entity.CommissionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommissionRecordRepository extends JpaRepository<CommissionRecord, Long> {
}
