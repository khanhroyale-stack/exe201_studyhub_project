package com.management.studyhub.service;

import com.management.studyhub.dto.PageResponseDTO;
import com.management.studyhub.dto.SubjectDTO;
import com.management.studyhub.dto.TutorListDTO;
import com.management.studyhub.entity.TutorProfile;
import com.management.studyhub.repository.TutorProfileRepository;
import com.management.studyhub.repository.specification.TutorSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TutorService {

    private final TutorProfileRepository tutorProfileRepository;

    public PageResponseDTO<TutorListDTO> searchTutors(
            String keyword, List<Integer> subjectIds, Double minPrice, Double maxPrice,
            Double minRating, String teachingMethod, String sortBy, int page, int size) {
        
        Sort sort = Sort.unsorted();
        if ("price_asc".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "price");
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "averageRating");
        } else {
            // Default "popular" can be rating or totalReviews. Let's use totalReviews or averageRating
            sort = Sort.by(Sort.Direction.DESC, "totalReviews");
        }

        Pageable pageable = PageRequest.of(page, size, sort);
        Specification<TutorProfile> spec = TutorSpecification.getTutorsByFilters(
                keyword, subjectIds, minPrice, maxPrice, minRating, teachingMethod);

        Page<TutorProfile> tutorPage = tutorProfileRepository.findAll(spec, pageable);

        List<TutorListDTO> dtoList = tutorPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return PageResponseDTO.<TutorListDTO>builder()
                .content(dtoList)
                .pageNo(tutorPage.getNumber())
                .pageSize(tutorPage.getSize())
                .totalElements(tutorPage.getTotalElements())
                .totalPages(tutorPage.getTotalPages())
                .last(tutorPage.isLast())
                .build();
    }

    private TutorListDTO mapToDTO(TutorProfile tutor) {
        List<SubjectDTO> subjectDTOs = tutor.getSubjects() == null ? List.of() :
                tutor.getSubjects().stream()
                        .map(s -> new SubjectDTO(s.getId(), s.getName()))
                        .collect(Collectors.toList());

        return TutorListDTO.builder()
                .id(tutor.getId())
                .fullName(tutor.getFullName())
                .avatarUrl(tutor.getAvatarUrl())
                .universityName(tutor.getUniversityName())
                .major(tutor.getMajor())
                .introduction(tutor.getIntroduction())
                .price(tutor.getPrice())
                .teachingMethod(tutor.getTeachingMethod())
                .averageRating(tutor.getAverageRating())
                .totalReviews(tutor.getTotalReviews())
                .subjects(subjectDTOs)
                .build();
    }
}
