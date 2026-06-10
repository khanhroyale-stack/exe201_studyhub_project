package com.management.studyhub.controller;

import com.management.studyhub.dto.JobPostingDTO;
import com.management.studyhub.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/job-postings")
@RequiredArgsConstructor
@CrossOrigin("*")
public class JobPostingController {
    private final JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPostingDTO> createJobPosting(@RequestBody JobPostingDTO dto) {
        if (dto.getSubject() == null || dto.getPricePerSession() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(jobPostingService.createJobPosting(dto));
    }

    @GetMapping
    public ResponseEntity<List<JobPostingDTO>> getActiveJobPostings() {
        return ResponseEntity.ok(jobPostingService.getActiveJobPostings());
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<JobPostingDTO>> getJobPostingsByParent(@PathVariable Long parentId) {
        return ResponseEntity.ok(jobPostingService.getJobPostingsByParent(parentId));
    }
}
