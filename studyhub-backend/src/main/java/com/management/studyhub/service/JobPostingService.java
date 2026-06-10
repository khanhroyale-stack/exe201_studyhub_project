package com.management.studyhub.service;

import com.management.studyhub.dto.JobPostingDTO;
import com.management.studyhub.entity.JobPosting;
import com.management.studyhub.entity.Parent;
import com.management.studyhub.repository.JobPostingRepository;
import com.management.studyhub.repository.ParentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobPostingService {
    private final JobPostingRepository jobPostingRepository;
    private final ParentRepository parentRepository;

    public JobPostingDTO createJobPosting(JobPostingDTO dto) {
        Parent parent = parentRepository.findById(dto.getParentId())
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        JobPosting job = new JobPosting();
        job.setParent(parent);
        job.setTitle(dto.getTitle());
        job.setSubject(dto.getSubject());
        job.setDescription(dto.getDescription());
        job.setPostedAt(LocalDateTime.now());
        job.setStatus("RECRUITING"); // default status
        job.setLocation(dto.getLocation());
        job.setSchedule(dto.getSchedule());
        job.setTutorGenderPreference(dto.getTutorGenderPreference());
        job.setPricePerSession(dto.getPricePerSession());
        job.setApplicantsCount(0);
        job.setLearningMode(dto.getLearningMode());
        job.setRequirement(dto.getRequirement());

        JobPosting saved = jobPostingRepository.save(job);
        return mapToDTO(saved);
    }

    public List<JobPostingDTO> getJobPostingsByParent(Long parentId) {
        return jobPostingRepository.findByParentIdOrderByPostedAtDesc(parentId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<JobPostingDTO> getActiveJobPostings() {
        return jobPostingRepository.findByStatusOrderByPostedAtDesc("RECRUITING")
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private JobPostingDTO mapToDTO(JobPosting job) {
        JobPostingDTO dto = new JobPostingDTO();
        dto.setId(job.getId());
        dto.setParentId(job.getParent().getId());
        dto.setParentName(job.getParent().getName());
        dto.setParentAvatar(job.getParent().getAvatar());
        dto.setTitle(job.getTitle());
        dto.setSubject(job.getSubject());
        dto.setDescription(job.getDescription());
        dto.setPostedAt(job.getPostedAt());
        dto.setStatus(job.getStatus());
        dto.setLocation(job.getLocation());
        dto.setSchedule(job.getSchedule());
        dto.setTutorGenderPreference(job.getTutorGenderPreference());
        dto.setPricePerSession(job.getPricePerSession());
        dto.setApplicantsCount(job.getApplicantsCount());
        dto.setLearningMode(job.getLearningMode());
        dto.setRequirement(job.getRequirement());
        return dto;
    }
}
