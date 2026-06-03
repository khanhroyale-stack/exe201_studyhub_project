package com.studyhub.api.controller;

import com.studyhub.api.entity.TutorEntity;
import com.studyhub.api.service.TutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller cung cấp các API endpoints cho Gia sư.
 */
@RestController
@RequestMapping("/api/v1/tutors")
@RequiredArgsConstructor
public class TutorController {

    private final TutorService tutorService;

    /**
     * GET /api/v1/tutors
     * Trả về danh sách toàn bộ gia sư.
     */
    @GetMapping
    public ResponseEntity<List<TutorEntity>> getAllTutors() {
        return ResponseEntity.ok(tutorService.getAllTutors());
    }
}
