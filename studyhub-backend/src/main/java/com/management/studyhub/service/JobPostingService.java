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

    public JobPostingDTO createPost(Long parentId, JobPostingDTO dto) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        JobPosting job = new JobPosting();
        job.setParent(parent);
        job.setTitle(dto.getTitle());
        job.setSubject(dto.getSubject());
        job.setClassLevel(dto.getClassLevel());
        job.setDescription(dto.getDescription());
        job.setPostedAt(LocalDateTime.now());
        job.setStatus("PENDING_APPROVAL"); // Mặc định là PENDING_APPROVAL theo luồng chờ admin duyệt
        job.setLocation(dto.getLocation());
        job.setDetailedAddress(dto.getDetailedAddress());
        job.setSchedule(dto.getSchedule());
        job.setPricePerSession(dto.getPricePerSession());
        job.setLearningMode(dto.getLearningMode());
        job.setRequirement(dto.getRequirement());
        job.setApplicantsCount(0);

        JobPosting savedJob = jobPostingRepository.save(job);
        return mapToDTO(savedJob);
    }

    public List<JobPostingDTO> getAllRecruitingPosts() {
        return jobPostingRepository.findByStatus("RECRUITING")
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<JobPostingDTO> getPendingPosts() {
        return jobPostingRepository.findByStatus("PENDING_APPROVAL")
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void approvePost(Long id) {
        JobPosting job = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        job.setStatus("RECRUITING");
        jobPostingRepository.save(job);
    }

    public void rejectPost(Long id) {
        JobPosting job = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        job.setStatus("CLOSED");
        jobPostingRepository.save(job);
    }

    private JobPostingDTO mapToDTO(JobPosting job) {
        JobPostingDTO dto = new JobPostingDTO();
        dto.setId(job.getId());
        if (job.getParent() != null && job.getParent().getUser() != null) {
            dto.setParentId(job.getParent().getId());
            dto.setParentName(job.getParent().getUser().getFullName());
            dto.setParentAvatar(job.getParent().getUser().getAvatarUrl());
        }
        dto.setTitle(job.getTitle());
        dto.setSubject(job.getSubject());
        dto.setClassLevel(job.getClassLevel());
        dto.setDescription(job.getDescription());
        dto.setPostedAt(job.getPostedAt());
        dto.setStatus(job.getStatus());
        dto.setLocation(job.getLocation());
        dto.setDetailedAddress(job.getDetailedAddress());
        dto.setSchedule(job.getSchedule());
        dto.setPricePerSession(job.getPricePerSession());
        dto.setLearningMode(job.getLearningMode());
        dto.setRequirement(job.getRequirement());
        return dto;
    }
}
