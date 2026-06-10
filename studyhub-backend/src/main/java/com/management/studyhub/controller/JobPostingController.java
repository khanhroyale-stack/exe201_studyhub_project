package com.management.studyhub.controller;

import com.management.studyhub.dto.JobPostingDTO;
import com.management.studyhub.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobPostingController {

    private final JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPostingDTO> createPost(@RequestParam Long parentId, @RequestBody JobPostingDTO dto) {
        JobPostingDTO createdPost = jobPostingService.createPost(parentId, dto);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public ResponseEntity<List<JobPostingDTO>> getAllRecruitingPosts() {
        return ResponseEntity.ok(jobPostingService.getAllRecruitingPosts());
    }

    // Admin endpoints
    @GetMapping("/admin/pending")
    public ResponseEntity<List<JobPostingDTO>> getPendingPosts() {
        return ResponseEntity.ok(jobPostingService.getPendingPosts());
    }

    @PutMapping("/admin/{id}/approve")
    public ResponseEntity<Void> approvePost(@PathVariable Long id) {
        jobPostingService.approvePost(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/admin/{id}/reject")
    public ResponseEntity<Void> rejectPost(@PathVariable Long id) {
        jobPostingService.rejectPost(id);
        return ResponseEntity.ok().build();
    }
}
