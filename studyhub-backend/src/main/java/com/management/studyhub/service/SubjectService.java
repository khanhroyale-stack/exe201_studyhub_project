package com.management.studyhub.service;

import com.management.studyhub.dto.SubjectDTO;
import com.management.studyhub.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public List<SubjectDTO> getAllSubjects() {
        return subjectRepository.findAll().stream()
                .map(s -> new SubjectDTO(s.getId(), s.getName()))
                .collect(Collectors.toList());
    }
}
