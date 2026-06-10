package com.management.studyhub.service;

import com.management.studyhub.dto.parentportal.*;
import com.management.studyhub.entity.*;
import com.management.studyhub.entity.enums.ApplicationStatus;
import com.management.studyhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentPortalService {

    private final JobPostingRepository jobPostingRepository;
    private final TutorApplicationRepository tutorApplicationRepository;
    private final ClassSessionRepository classSessionRepository;
    private final ParentFeedbackRepository parentFeedbackRepository;
    private final ParentRepository parentRepository;

    // Hardcoded parent ID for now until Spring Security context is fully utilized
    private Parent getCurrentParent() {
        return parentRepository.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("No parent found"));
    }

    public ParentDashboardDTO getDashboardStats() {
        Parent parent = getCurrentParent();
        ParentDashboardDTO dto = new ParentDashboardDTO();
        dto.setBudgetSpentThisMonth(parent.getBudgetSpentThisMonth() != null ? parent.getBudgetSpentThisMonth() : 0.0);
        dto.setClassesWaiting(parent.getClassesWaiting() != null ? parent.getClassesWaiting() : 0);
        
        List<JobPosting> jobs = jobPostingRepository.findByParent(parent);
        int activeApps = 0;
        for (JobPosting jp : jobs) {
            if ("RECRUITING".equals(jp.getStatus())) {
                activeApps += jp.getApplicantsCount() != null ? jp.getApplicantsCount() : 0;
            }
        }
        dto.setActiveApplications(activeApps);
        dto.setNewApplicationsToday(activeApps > 0 ? 1 : 0); // Mocked logic
        return dto;
    }

    public List<ParentJobPostingDTO> getJobPostings() {
        Parent parent = getCurrentParent();
        return jobPostingRepository.findByParent(parent).stream().map(jp -> {
            ParentJobPostingDTO dto = new ParentJobPostingDTO();
            dto.setId(jp.getId());
            dto.setTitle(jp.getTitle());
            dto.setSubject(jp.getSubject());
            dto.setStatus(jp.getStatus());
            dto.setLocation(jp.getLocation());
            dto.setSchedule(jp.getSchedule());
            dto.setRequirement(jp.getRequirement());
            dto.setPricePerSession(jp.getPricePerSession());
            dto.setApplicantsCount(jp.getApplicantsCount());
            
            List<String> avatars = tutorApplicationRepository.findByJobPosting(jp)
                .stream()
                .map(app -> app.getTutor() != null ? app.getTutor().getAvatarUrl() : "")
                .collect(Collectors.toList());
            dto.setApplicantsAvatars(avatars);
            return dto;
        }).collect(Collectors.toList());
    }

    public ParentJobPostingDTO createJobPosting(ParentJobPostingDTO request) {
        Parent parent = getCurrentParent();
        JobPosting jp = new JobPosting();
        jp.setParent(parent);
        jp.setTitle(request.getTitle());
        jp.setSubject(request.getSubject());
        jp.setDescription(request.getRequirement());
        jp.setRequirement(request.getRequirement());
        jp.setLocation(request.getLocation());
        jp.setSchedule(request.getSchedule());
        jp.setPricePerSession(request.getPricePerSession());
        jp.setStatus("RECRUITING");
        jp.setApplicantsCount(0);
        jp.setLearningMode("ONLINE"); // default
        jp.setPostedAt(java.time.LocalDateTime.now());
        
        jp = jobPostingRepository.save(jp);
        request.setId(jp.getId());
        return request;
    }

    public List<ParentTutorApplicationDTO> getApplicantsByJob(Long jobId) {
        JobPosting jp = jobPostingRepository.findById(jobId).orElseThrow();
        return tutorApplicationRepository.findByJobPosting(jp).stream().map(app -> {
            ParentTutorApplicationDTO dto = new ParentTutorApplicationDTO();
            dto.setId(app.getId());
            if (app.getTutor() != null) {
                dto.setTutorId(app.getTutor().getId());
                dto.setTutorName(app.getTutor().getFullName());
                dto.setTutorAvatar(app.getTutor().getAvatarUrl());
                dto.setTutorTitle(app.getTutor().getIntroduction());
                dto.setTutorRating(app.getTutor().getAverageRating());
                dto.setTutorReviewCount(app.getTutor().getTotalReviews());
            }
            dto.setMessage(app.getMessage());
            dto.setStatus(app.getStatus() != null ? app.getStatus().name() : "PENDING");
            dto.setAppliedAt(app.getCreatedAt() != null ? app.getCreatedAt().toString() : "");
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void acceptApplication(Long applicationId) {
        TutorApplication app = tutorApplicationRepository.findById(applicationId).orElseThrow();
        app.setStatus(ApplicationStatus.ACCEPTED);
        tutorApplicationRepository.save(app);

        JobPosting jp = app.getJobPosting();
        if (jp != null) {
            jp.setStatus("CLOSED");
            jobPostingRepository.save(jp);
            
            // Reject others
            List<TutorApplication> others = tutorApplicationRepository.findByJobPosting(jp);
            for (TutorApplication other : others) {
                if (!other.getId().equals(app.getId())) {
                    other.setStatus(ApplicationStatus.REJECTED);
                    tutorApplicationRepository.save(other);
                }
            }
            
            // Create ClassSession
            ClassSession cs = new ClassSession();
            cs.setParent(jp.getParent());
            cs.setClassName(jp.getTitle());
            if (app.getTutor() != null) {
                cs.setTutorName(app.getTutor().getFullName());
                cs.setTutorAvatar(app.getTutor().getAvatarUrl());
                cs.setTutorProfile(app.getTutor());
            }
            cs.setSchedule(jp.getSchedule());
            cs.setStatus("OFFICIAL");
            cs.setNextSessionDate(java.time.LocalDateTime.now().plusDays(1));
            cs.setProgress(0);
            cs.setPricePerSession(jp.getPricePerSession());
            classSessionRepository.save(cs);
        }
    }
    public List<com.management.studyhub.dto.tutorportal.ClassSessionDTO> getClasses() {
        Parent parent = getCurrentParent();
        return classSessionRepository.findByParent(parent).stream().map(cs -> {
            com.management.studyhub.dto.tutorportal.ClassSessionDTO dto = new com.management.studyhub.dto.tutorportal.ClassSessionDTO();
            dto.setId(cs.getId());
            dto.setClassName(cs.getClassName());
            dto.setTutorName(cs.getTutorName());
            dto.setTutorAvatar(cs.getTutorAvatar());
            dto.setSchedule(cs.getSchedule());
            dto.setPricePerSession(cs.getPricePerSession() != null ? cs.getPricePerSession() : 0.0);
            dto.setStatus(cs.getStatus());
            dto.setProgress(cs.getProgress() != null ? cs.getProgress() : 0);
            return dto;
        }).collect(Collectors.toList());
    }

    public List<ParentFeedbackDTO> getFeedbacks() {
        Parent parent = getCurrentParent();
        List<ClassSession> classes = classSessionRepository.findByParent(parent);
        return parentFeedbackRepository.findAll().stream()
            .filter(f -> f.getClassSession() != null && f.getClassSession().getParent().getId().equals(parent.getId()))
            .map(f -> {
                ParentFeedbackDTO dto = new ParentFeedbackDTO();
                dto.setId(f.getId());
                dto.setClassId(f.getClassSession().getId());
                dto.setClassName(f.getClassSession().getClassName());
                dto.setTutorName(f.getClassSession().getTutorName());
                dto.setRating(f.getRating());
                dto.setComment(f.getComment());
                dto.setCreatedAt(f.getCreatedAt() != null ? f.getCreatedAt().toString() : "");
                return dto;
            }).collect(Collectors.toList());
    }

    public void createFeedback(ParentFeedbackDTO request) {
        ClassSession cs = classSessionRepository.findById(request.getClassId()).orElseThrow();
        ParentFeedback feedback = new ParentFeedback();
        feedback.setClassSession(cs);
        feedback.setTutorId(String.valueOf(cs.getTutorProfile() != null ? cs.getTutorProfile().getId() : 0));
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setCreatedAt(java.time.LocalDateTime.now());
        parentFeedbackRepository.save(feedback);
    }
}
