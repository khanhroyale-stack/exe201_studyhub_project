package com.management.studyhub.service;

import com.management.studyhub.dto.StudyMaterialDTO;
import com.management.studyhub.entity.StudyMaterial;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.User;
import com.management.studyhub.repository.StudyMaterialRepository;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyMaterialService {

    private final StudyMaterialRepository studyMaterialRepository;
    private final ClassSessionRepository classSessionRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public List<StudyMaterialDTO> getMaterialsByClassSessionId(Long classSessionId) {
        return studyMaterialRepository.findByClassSessionIdOrderByUploadedAtDesc(classSessionId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public StudyMaterialDTO uploadMaterial(Long classSessionId, Long uploaderId, String title, MultipartFile file) throws IOException {
        ClassSession classSession = classSessionRepository.findById(classSessionId)
                .orElseThrow(() -> new RuntimeException("Lớp học không tồn tại"));

        User uploader = userRepository.findById(uploaderId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        String fileUrl = cloudinaryService.uploadFile(file);
        
        String originalFilename = file.getOriginalFilename();
        String fileType = "unknown";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileType = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        }

        StudyMaterial material = new StudyMaterial();
        material.setClassSession(classSession);
        material.setUploader(uploader);
        material.setTitle(title);
        material.setFileUrl(fileUrl);
        material.setFileType(fileType);

        StudyMaterial saved = studyMaterialRepository.save(material);
        return mapToDTO(saved);
    }

    public void deleteMaterial(Long id) {
        studyMaterialRepository.deleteById(id);
    }

    private StudyMaterialDTO mapToDTO(StudyMaterial material) {
        StudyMaterialDTO dto = new StudyMaterialDTO();
        dto.setId(material.getId());
        dto.setClassSessionId(material.getClassSession().getId());
        dto.setUploaderId(material.getUploader().getId());
        dto.setUploaderName(material.getUploader().getFullName());
        dto.setTitle(material.getTitle());
        dto.setFileUrl(material.getFileUrl());
        dto.setFileType(material.getFileType());
        dto.setUploadedAt(material.getUploadedAt());
        return dto;
    }
}
