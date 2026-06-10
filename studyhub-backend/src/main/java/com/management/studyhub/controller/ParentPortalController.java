package com.management.studyhub.controller;

import com.management.studyhub.dto.parentportal.*;
import com.management.studyhub.service.ParentPortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parent-portal")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ParentPortalController {

    private final ParentPortalService parentPortalService;

    @GetMapping("/dashboard")
    public ResponseEntity<ParentDashboardDTO> getDashboardStats() {
        return ResponseEntity.ok(parentPortalService.getDashboardStats());
    }

    @GetMapping("/posts")
    public ResponseEntity<List<ParentJobPostingDTO>> getJobPostings() {
        return ResponseEntity.ok(parentPortalService.getJobPostings());
    }

    @PostMapping("/posts")
    public ResponseEntity<ParentJobPostingDTO> createJobPosting(@RequestBody ParentJobPostingDTO request) {
        return ResponseEntity.ok(parentPortalService.createJobPosting(request));
    }

    @GetMapping("/posts/{postId}/applicants")
    public ResponseEntity<List<ParentTutorApplicationDTO>> getApplicantsByJob(@PathVariable Long postId) {
        return ResponseEntity.ok(parentPortalService.getApplicantsByJob(postId));
    }

    @PostMapping("/applicants/{applicationId}/accept")
    public ResponseEntity<Void> acceptApplication(@PathVariable Long applicationId) {
        parentPortalService.acceptApplication(applicationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/classes")
    public ResponseEntity<List<com.management.studyhub.dto.tutorportal.ClassSessionDTO>> getClasses() {
        return ResponseEntity.ok(parentPortalService.getClasses());
    }

    @GetMapping("/feedback")
    public ResponseEntity<List<ParentFeedbackDTO>> getFeedbacks() {
        return ResponseEntity.ok(parentPortalService.getFeedbacks());
    }

    @PostMapping("/feedback")
    public ResponseEntity<Void> createFeedback(@RequestBody ParentFeedbackDTO request) {
        parentPortalService.createFeedback(request);
        return ResponseEntity.ok().build();
    }
}
