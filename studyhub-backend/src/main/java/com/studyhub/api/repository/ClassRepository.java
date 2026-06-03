package com.studyhub.api.repository;

import com.studyhub.api.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository quản lý việc đọc/ghi dữ liệu Lớp học vào H2 Database.
 */
@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
}
