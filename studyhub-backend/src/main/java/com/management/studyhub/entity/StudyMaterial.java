package com.management.studyhub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "study_materials")
@Data
public class StudyMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết với lớp học (nullable để hỗ trợ tài liệu công khai không thuộc lớp)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_session_id", nullable = true)
    private ClassSession classSession;

    // Người tải lên (Gia sư hoặc Phụ huynh)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploader_id", nullable = true)
    private User uploader;

    // Môn học liên quan (cho tài liệu công khai)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = true)
    private Subject subject;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String fileUrl;

    @Column(length = 50)
    private String fileType; // pdf, docx, png, jpg...

    // Đánh dấu tài liệu công khai (hiển thị cho tất cả)
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = false;

    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
        if (isPublic == null) isPublic = false;
    }
}
