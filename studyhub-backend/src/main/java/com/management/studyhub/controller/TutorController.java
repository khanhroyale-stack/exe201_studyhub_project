package com.management.studyhub.controller;

import com.management.studyhub.dto.PageResponseDTO;
import com.management.studyhub.dto.TutorListDTO;
import com.management.studyhub.service.TutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
