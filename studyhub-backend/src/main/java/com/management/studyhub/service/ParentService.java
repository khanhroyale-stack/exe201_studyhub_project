package com.management.studyhub.service;

import com.management.studyhub.dto.ParentDTO;
import com.management.studyhub.dto.ClassSessionDTO;
import com.management.studyhub.entity.Parent;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.repository.ParentRepository;
import com.management.studyhub.repository.ClassSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final ParentRepository parentRepository;
    private final ClassSessionRepository classSessionRepository;

    public ParentDTO getParentById(Long id) {
        Parent parent = parentRepository.findById(id).orElseThrow(() -> new RuntimeException("Parent not found"));
        return mapToDTO(parent);
    }

    public ParentDTO updateParent(Long id, ParentDTO dto) {
        Parent parent = parentRepository.findById(id).orElseThrow(() -> new RuntimeException("Parent not found"));
        parent.setName(dto.getName());
        parent.setPhone(dto.getPhone());
        if (dto.getAvatar() != null) {
            parent.setAvatar(dto.getAvatar());
        }
        parent.setAddress(dto.getAddress());
        Parent saved = parentRepository.save(parent);
        return mapToDTO(saved);
    }

    public List<ClassSessionDTO> getClassSessions(Long parentId) {
        return classSessionRepository.findByParentId(parentId)
                .stream().map(this::mapSessionToDTO).collect(Collectors.toList());
    }

    private ParentDTO mapToDTO(Parent parent) {
        ParentDTO dto = new ParentDTO();
        dto.setId(parent.getId());
        dto.setName(parent.getName());
        dto.setEmail(parent.getEmail());
        dto.setPhone(parent.getPhone());
        dto.setAvatar(parent.getAvatar());
        dto.setAddress(parent.getAddress());
        dto.setBudgetSpentThisMonth(parent.getBudgetSpentThisMonth());
        dto.setClassesWaiting(parent.getClassesWaiting());
        return dto;
    }

    private ClassSessionDTO mapSessionToDTO(ClassSession session) {
        ClassSessionDTO dto = new ClassSessionDTO();
        dto.setId(session.getId());
        dto.setParentId(session.getParent().getId());
        dto.setClassName(session.getClassName());
        dto.setTutorName(session.getTutorName());
        dto.setTutorAvatar(session.getTutorAvatar());
        dto.setSchedule(session.getSchedule());
        dto.setStatus(session.getStatus());
        dto.setNextSessionDate(session.getNextSessionDate());
        dto.setProgress(session.getProgress());
        return dto;
    }
}
