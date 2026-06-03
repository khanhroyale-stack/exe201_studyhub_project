package com.studyhub.api.controller;

import com.studyhub.api.entity.ClassEntity;
import com.studyhub.api.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller cung cấp các API endpoints cho Lớp học.
 */
@RestController
@RequestMapping("/api/v1/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    /**
     * GET /api/v1/classes
     * Trả về danh sách toàn bộ lớp học.
     */
    @GetMapping
    public ResponseEntity<List<ClassEntity>> getAllClasses() {
        return ResponseEntity.ok(classService.getAllClasses());
    }

    /**
     * GET /api/v1/classes/{id}
     * Trả về chi tiết 1 lớp học theo ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClassEntity> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(classService.getClassById(id));
    }
}
