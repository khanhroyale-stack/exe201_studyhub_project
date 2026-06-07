package com.management.studyhub.service;

import com.management.studyhub.dto.TestimonialDto;
import com.management.studyhub.entity.Testimonial;
import com.management.studyhub.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository testimonialRepository;

    @Override
    public List<TestimonialDto> getFeaturedTestimonials() {
        return testimonialRepository.findFeaturedTestimonials(PageRequest.of(0, 4))
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private TestimonialDto mapToDto(Testimonial t) {
        TestimonialDto dto = new TestimonialDto();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setRole(t.getRole());
        dto.setAvatar(t.getAvatar());
        dto.setQuote(t.getQuote());
        dto.setStars(t.getStars());
        return dto;
    }
}
