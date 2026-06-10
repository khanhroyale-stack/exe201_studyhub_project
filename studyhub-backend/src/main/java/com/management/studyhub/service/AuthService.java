package com.management.studyhub.service;

import com.management.studyhub.dto.AuthRequestDTO;
import com.management.studyhub.dto.AuthResponseDTO;
import com.management.studyhub.dto.RegisterDTO;
import com.management.studyhub.entity.User;
import com.management.studyhub.entity.enums.UserRole;
import com.management.studyhub.repository.UserRepository;
import com.management.studyhub.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.management.studyhub.entity.TutorProfile;
import com.management.studyhub.entity.enums.EkycStatus;
import com.management.studyhub.entity.enums.TutorStatus;
import com.management.studyhub.repository.TutorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TutorProfileRepository tutorProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponseDTO login(AuthRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        Long tutorId = null;
        if (user.getRole() == UserRole.TUTOR) {
            Optional<TutorProfile> profileOpt = tutorProfileRepository.findByUserId(user.getId());
            if (profileOpt.isPresent()) {
                tutorId = profileOpt.get().getId();
            }
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponseDTO(token, user.getRole(), user.getEmail(), user.getFullName(), user.getAvatarUrl(), tutorId);
    }

    public AuthResponseDTO register(RegisterDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        UserRole role;
        try {
            role = UserRole.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            role = UserRole.PARENT; // Default fallback
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setFullName(request.getFullName());
        
        userRepository.save(user);

        Long tutorId = null;
        if (role == UserRole.TUTOR) {
            TutorProfile tutorProfile = new TutorProfile();
            tutorProfile.setUser(user);
            tutorProfile.setFullName(user.getFullName());
            tutorProfile.setEkycStatus(EkycStatus.NOT_STARTED);
            tutorProfile.setStatus(TutorStatus.PENDING);
            tutorProfileRepository.save(tutorProfile);
            tutorId = tutorProfile.getId();
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponseDTO(token, user.getRole(), user.getEmail(), user.getFullName(), user.getAvatarUrl(), tutorId);
    }
}
