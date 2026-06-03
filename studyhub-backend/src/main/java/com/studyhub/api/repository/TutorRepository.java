package com.studyhub.api.repository;

import com.studyhub.api.entity.TutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository quản lý việc đọc/ghi dữ liệu Gia sư vào H2 Database.
 */
@Repository
public interface TutorRepository extends JpaRepository<TutorEntity, Long> {
}
