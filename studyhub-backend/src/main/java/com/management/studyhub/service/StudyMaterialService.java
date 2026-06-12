package com.management.studyhub.service;

import com.management.studyhub.dto.StudyMaterialDTO;
import com.management.studyhub.entity.StudyMaterial;
import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.Subject;
import com.management.studyhub.entity.User;
import com.management.studyhub.repository.StudyMaterialRepository;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.SubjectRepository;
import com.management.studyhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final SubjectRepository subjectRepository;
    private final CloudinaryService cloudinaryService;

    public List<StudyMaterialDTO> getMaterialsByClassSessionId(Long classSessionId) {
        return studyMaterialRepository.findByClassSessionIdOrderByUploadedAtDesc(classSessionId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Lấy tài liệu công khai với filter & phân trang
    public Page<StudyMaterialDTO> getPublicMaterials(Long subjectId, String fileType, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        String kw = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;
        String ft = (fileType != null && !fileType.isBlank() && !fileType.equals("ALL")) ? fileType.toLowerCase() : null;
        return studyMaterialRepository.findPublicMaterials(subjectId, ft, kw, pageable)
                .map(this::mapToDTO);
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
            fileType = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }

        StudyMaterial material = new StudyMaterial();
        material.setClassSession(classSession);
        material.setUploader(uploader);
        material.setTitle(title);
        material.setFileUrl(fileUrl);
        material.setFileType(fileType);
        material.setIsPublic(false);

        StudyMaterial saved = studyMaterialRepository.save(material);
        return mapToDTO(saved);
    }

    public StudyMaterialDTO uploadPublicMaterial(Long uploaderId, Long subjectId, String title, String description, MultipartFile file) throws IOException {
        User uploader = userRepository.findById(uploaderId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        Subject subject = null;
        if (subjectId != null) {
            subject = subjectRepository.findById(Math.toIntExact(subjectId))
                    .orElseThrow(() -> new RuntimeException("Môn học không tồn tại"));
        }

        String fileUrl = cloudinaryService.uploadFile(file);
        
        String originalFilename = file.getOriginalFilename();
        String fileType = "unknown";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileType = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }

        StudyMaterial material = new StudyMaterial();
        material.setUploader(uploader);
        material.setSubject(subject);
        material.setTitle(title);
        material.setDescription(description);
        material.setFileUrl(fileUrl);
        material.setFileType(fileType);
        material.setIsPublic(true);

        StudyMaterial saved = studyMaterialRepository.save(material);
        return mapToDTO(saved);
    }

    public void deleteMaterial(Long id) {
        studyMaterialRepository.deleteById(id);
    }

    private StudyMaterialDTO mapToDTO(StudyMaterial material) {
        StudyMaterialDTO dto = new StudyMaterialDTO();
        dto.setId(material.getId());
        if (material.getClassSession() != null) {
            dto.setClassSessionId(material.getClassSession().getId());
        }
        if (material.getUploader() != null) {
            dto.setUploaderId(material.getUploader().getId());
            dto.setUploaderName(material.getUploader().getFullName());
        }
        if (material.getSubject() != null) {
            dto.setSubjectId(Long.valueOf(material.getSubject().getId()));
            dto.setSubjectName(material.getSubject().getName());
        }
        dto.setTitle(material.getTitle());
        dto.setDescription(material.getDescription());
        dto.setFileUrl(material.getFileUrl());
        dto.setFileType(material.getFileType());
        dto.setIsPublic(material.getIsPublic());
        dto.setUploadedAt(material.getUploadedAt());
        return dto;
    }
}
