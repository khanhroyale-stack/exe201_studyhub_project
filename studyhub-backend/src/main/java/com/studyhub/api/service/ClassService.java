package com.studyhub.api.service;

import com.studyhub.api.entity.ClassEntity;
import com.studyhub.api.repository.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service xử lý business logic cho Lớp học.
 */
@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;

    /**
     * Lấy danh sách toàn bộ lớp học.
     */
    public List<ClassEntity> getAllClasses() {
        return classRepository.findAll();
    }

    /**
     * Lấy chi tiết 1 lớp học theo ID, ném lỗi nếu không tìm thấy.
     */
    public ClassEntity getClassById(Long id) {
        return classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học với ID: " + id));
    }
}
