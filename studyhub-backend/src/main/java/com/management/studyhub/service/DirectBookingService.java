package com.management.studyhub.service;

import com.management.studyhub.dto.DirectBookingDTO;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.DirectBooking;
import com.management.studyhub.entity.TutorProfile;
import com.management.studyhub.entity.User;
import com.management.studyhub.entity.enums.ClassSessionStatus;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.DirectBookingRepository;
import com.management.studyhub.repository.ParentRepository;
import com.management.studyhub.repository.TutorProfileRepository;
import com.management.studyhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DirectBookingService {
    private final DirectBookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TutorProfileRepository tutorProfileRepository;
    private final ClassSessionRepository classSessionRepository;
    private final ParentRepository parentRepository;

    @Transactional
    public DirectBookingDTO createBooking(DirectBookingDTO dto) {
        User parent = userRepository.findById(dto.getParentId())
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        TutorProfile tutor = tutorProfileRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        DirectBooking booking = new DirectBooking();
        booking.setParent(parent);
        booking.setTutor(tutor);
        booking.setSubject(dto.getSubject());
        booking.setSchedule(dto.getSchedule());
        booking.setLearningMode(dto.getLearningMode());
        booking.setAddress(dto.getAddress());
        booking.setPricePerSession(dto.getPricePerSession());
        booking.setParentMessage(dto.getParentMessage());
        
        booking = bookingRepository.save(booking);
        return mapToDTO(booking);
    }

    public List<DirectBookingDTO> getBookingsByParent(Long parentId) {
        return bookingRepository.findByParentIdOrderByCreatedAtDesc(parentId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<DirectBookingDTO> getBookingsByTutor(Long tutorId) {
        return bookingRepository.findByTutorIdOrderByCreatedAtDesc(tutorId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DirectBookingDTO acceptBooking(Long bookingId) {
        DirectBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("ACCEPTED");
        bookingRepository.save(booking);

        // Tạo Lớp học (Class Session)
        ClassSession classSession = new ClassSession();
        classSession.setParent(parentRepository.findByUserId(booking.getParent().getId()).orElse(null));
        classSession.setParentName(booking.getParent().getFullName());
        classSession.setTutorProfileId(booking.getTutor().getId());
        classSession.setTutorName(booking.getTutor().getFullName());
        classSession.setTutorAvatar(booking.getTutor().getAvatarUrl());
        classSession.setSubject(booking.getSubject());
        classSession.setClassName(booking.getSubject() + " - " + booking.getParent().getFullName());
        classSession.setSchedule(booking.getSchedule());
        classSession.setPricePerSession(booking.getPricePerSession() != null ? booking.getPricePerSession().doubleValue() : 0.0);
        classSession.setLearningMode(booking.getLearningMode() != null ? booking.getLearningMode() : "ONLINE");
        classSession.setAddress(booking.getAddress());
        classSession.setStatus(ClassSessionStatus.TRIAL); // Bắt đầu học thử
        classSessionRepository.save(classSession);

        return mapToDTO(booking);
    }

    @Transactional
    public DirectBookingDTO rejectBooking(Long bookingId) {
        DirectBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus("REJECTED");
        booking = bookingRepository.save(booking);
        return mapToDTO(booking);
    }

    private DirectBookingDTO mapToDTO(DirectBooking booking) {
        DirectBookingDTO dto = new DirectBookingDTO();
        dto.setId(booking.getId());
        dto.setParentId(booking.getParent().getId());
        dto.setParentName(booking.getParent().getFullName());
        dto.setParentAvatarUrl(booking.getParent().getAvatarUrl());
        
        dto.setTutorId(booking.getTutor().getId());
        dto.setTutorName(booking.getTutor().getFullName());
        dto.setTutorAvatarUrl(booking.getTutor().getAvatarUrl());
        
        dto.setSubject(booking.getSubject());
        dto.setSchedule(booking.getSchedule());
        dto.setLearningMode(booking.getLearningMode());
        dto.setAddress(booking.getAddress());
        dto.setPricePerSession(booking.getPricePerSession());
        dto.setParentMessage(booking.getParentMessage());
        dto.setStatus(booking.getStatus());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
}
