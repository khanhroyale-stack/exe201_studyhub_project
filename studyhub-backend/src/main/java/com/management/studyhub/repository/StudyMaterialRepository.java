package com.management.studyhub.repository;

import com.management.studyhub.entity.StudyMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    List<StudyMaterial> findByClassSessionIdOrderByUploadedAtDesc(Long classSessionId);

    // Tìm tài liệu công khai với filter & phân trang
    @Query("SELECT m FROM StudyMaterial m LEFT JOIN m.subject s " +
           "WHERE m.isPublic = true " +
           "AND (:subjectId IS NULL OR s.id = :subjectId) " +
           "AND (:fileType IS NULL OR m.fileType = :fileType) " +
           "AND (:keyword IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "     OR LOWER(m.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY m.uploadedAt DESC")
    Page<StudyMaterial> findPublicMaterials(
            @Param("subjectId") Long subjectId,
            @Param("fileType") String fileType,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
