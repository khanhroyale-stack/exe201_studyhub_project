package com.management.studyhub.controller;

import com.management.studyhub.dto.tutorportal.ClassSessionDTO;
import com.management.studyhub.dto.tutorportal.CommissionRecordDTO;
import com.management.studyhub.dto.tutorportal.CreateCourseRequestDTO;
import com.management.studyhub.dto.tutorportal.JobPostingDTO;
import com.management.studyhub.dto.tutorportal.SubjectDTO;
import com.management.studyhub.dto.tutorportal.ReviewDTO;
import com.management.studyhub.dto.tutorportal.TutorPostDTO;
import com.management.studyhub.dto.tutorportal.LessonScheduleDTO;
import com.management.studyhub.service.TutorPortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tutor-portal")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TutorPortalController {

    private final TutorPortalService tutorPortalService;

    // We'll hardcode "Thầy Nguyễn Hoàng Nam" as the authenticated tutor for now
    // to make it easier for testing without the full auth token setup on frontend.
    private final String AUTHENTICATED_TUTOR_NAME = "Thầy Nguyễn Hoàng Nam";

    @GetMapping("/subjects")
    public ResponseEntity<List<SubjectDTO>> getSubjects() {
        return ResponseEntity.ok(tutorPortalService.getSubjects());
    }

    @GetMapping("/job-postings")
    public ResponseEntity<List<JobPostingDTO>> getJobPostings(
            @RequestParam(required = false) List<String> subjects,
            @RequestParam(required = false, defaultValue = "ALL") String learningMode,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false, defaultValue = "newest") String sortBy) {
        return ResponseEntity.ok(tutorPortalService.getJobPostings(subjects, learningMode, minPrice, maxPrice, sortBy));
    }

    @GetMapping("/job-postings/{id}")
    public ResponseEntity<JobPostingDTO> getJobPostingById(@PathVariable Long id) {
        return ResponseEntity.ok(tutorPortalService.getJobPostingById(id));
    }

    @PostMapping("/job-postings/{id}/apply")
    public ResponseEntity<?> applyForJob(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        tutorPortalService.applyForJob(id, payload.get("message"), AUTHENTICATED_TUTOR_NAME);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/classes")
    public ResponseEntity<List<ClassSessionDTO>> getClasses() {
        return ResponseEntity.ok(tutorPortalService.getClassesForTutor(AUTHENTICATED_TUTOR_NAME));
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<LessonScheduleDTO>> getSchedule(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        
        LocalDateTime start;
        LocalDateTime end;
        
        if (startDate != null && endDate != null) {
            start = LocalDateTime.parse(startDate + "T00:00:00");
            end = LocalDateTime.parse(endDate + "T23:59:59");
        } else {
            // Default to current week
            LocalDateTime now = LocalDateTime.now();
            start = now.minusDays(now.getDayOfWeek().getValue() - 1).withHour(0).withMinute(0).withSecond(0);
            end = start.plusDays(6).withHour(23).withMinute(59).withSecond(59);
        }
        
        return ResponseEntity.ok(tutorPortalService.getWeeklySchedule(AUTHENTICATED_TUTOR_NAME, start, end));
    }

    @GetMapping("/billing")
    public ResponseEntity<List<CommissionRecordDTO>> getBilling() {
        return ResponseEntity.ok(tutorPortalService.getBillingForTutor(AUTHENTICATED_TUTOR_NAME));
    }

    @PostMapping("/classes/{classId}/attendance")
    public ResponseEntity<?> markAttendance(@PathVariable Long classId) {
        // Old endpoint, kept for compatibility if needed.
        return ResponseEntity.ok("Điểm danh lớp thành công!");
    }

    @PostMapping("/lessons/{lessonId}/attendance")
    public ResponseEntity<?> markLessonAttendance(@PathVariable Long lessonId) {
        tutorPortalService.markLessonAttendance(lessonId);
        return ResponseEntity.ok("Điểm danh buổi học thành công!");
    }

    @PostMapping("/lessons/{lessonId}/request-change")
    public ResponseEntity<?> requestScheduleChange(@PathVariable Long lessonId) {
        // Just mock success for now
        return ResponseEntity.ok("Yêu cầu đổi lịch đã được gửi!");
    }

    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseRequestDTO req) {
        return ResponseEntity.ok(tutorPortalService.createCourse(req, AUTHENTICATED_TUTOR_NAME));
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviews() {
        return ResponseEntity.ok(tutorPortalService.getReviewsForTutor(AUTHENTICATED_TUTOR_NAME));
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<TutorPostDTO>> getMyPosts() {
        return ResponseEntity.ok(tutorPortalService.getMyPosts(AUTHENTICATED_TUTOR_NAME));
    }

    @DeleteMapping("/my-posts/{id}")
    public ResponseEntity<?> deleteMyPost(@PathVariable Long id) {
        tutorPortalService.deleteMyPost(id, AUTHENTICATED_TUTOR_NAME);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/applications")
    public ResponseEntity<List<com.management.studyhub.dto.parentportal.ParentTutorApplicationDTO>> getMyApplications() {
        return ResponseEntity.ok(tutorPortalService.getMyApplications(AUTHENTICATED_TUTOR_NAME));
    }
}
