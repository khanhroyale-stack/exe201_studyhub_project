package com.management.studyhub.controller;

import com.management.studyhub.dto.ReviewDTO;
import com.management.studyhub.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO dto) {
        return ResponseEntity.ok(reviewService.createReview(dto));
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByParent(@PathVariable Long parentId) {
        return ResponseEntity.ok(reviewService.getReviewsByParent(parentId));
    }
}
