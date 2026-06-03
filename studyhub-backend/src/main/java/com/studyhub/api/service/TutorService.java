package com.studyhub.api.service;

import com.studyhub.api.entity.TutorEntity;
import com.studyhub.api.repository.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service xử lý business logic cho Gia sư.
 */
@Service
@RequiredArgsConstructor
public class TutorService {

    private final TutorRepository tutorRepository;

    /**
     * Lấy danh sách toàn bộ gia sư.
     */
    public List<TutorEntity> getAllTutors() {
        return tutorRepository.findAll();
    }
}
