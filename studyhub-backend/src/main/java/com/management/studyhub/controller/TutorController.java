package com.management.studyhub.controller;

import com.management.studyhub.dto.PageResponseDTO;
import com.management.studyhub.dto.TutorListDTO;
import com.management.studyhub.service.TutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.management.studyhub.dto.TutorEkycRequestDTO;

@RestController
@RequestMapping("/api/v1/tutors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend to access
public class TutorController {

    private final TutorService tutorService;

    @GetMapping
    public ResponseEntity<PageResponseDTO<TutorListDTO>> getTutors(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) List<Integer> subjectIds,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) String teachingMethod,
            @RequestParam(defaultValue = "popular") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponseDTO<TutorListDTO> response = tutorService.searchTutors(
                keyword, subjectIds, minPrice, maxPrice, minRating, teachingMethod, sortBy, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.management.studyhub.entity.TutorProfile> getTutor(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.getTutorProfile(id));
    }

    @PostMapping("/{id}/ekyc")
    public ResponseEntity<?> updateEkycProfile(
            @PathVariable Long id,
            @RequestBody TutorEkycRequestDTO request) {
        try {
            Map<String, Object> result = tutorService.processEkyc(id, request);
            boolean success = (boolean) result.get("success");
            if (success) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "score", 0,
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify-ekyc")
    public ResponseEntity<?> verifyEkycScore(@RequestBody TutorEkycRequestDTO request) {
        try {
            Map<String, Object> result = tutorService.verifyEkyc(request);
            boolean success = (boolean) result.get("success");
            if (success) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "score", 0,
                "message", e.getMessage()
            ));
        }
    }
}
