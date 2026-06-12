package com.management.studyhub.controller;

import com.management.studyhub.dto.StudyMaterialDTO;
import com.management.studyhub.service.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/study-materials")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudyMaterialController {

    private final StudyMaterialService studyMaterialService;

    /** API công khai: lấy tài liệu công khai với filter & phân trang */
    @GetMapping("/public")
    public ResponseEntity<Page<StudyMaterialDTO>> getPublicMaterials(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) String fileType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(studyMaterialService.getPublicMaterials(subjectId, fileType, keyword, page, size));
    }

    @GetMapping("/class/{classSessionId}")
    public ResponseEntity<List<StudyMaterialDTO>> getMaterials(@PathVariable Long classSessionId) {
        return ResponseEntity.ok(studyMaterialService.getMaterialsByClassSessionId(classSessionId));
    }

    @PostMapping("/class/{classSessionId}")
    public ResponseEntity<?> uploadMaterial(
            @PathVariable Long classSessionId,
            @RequestParam("uploaderId") Long uploaderId,
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file) {
        try {
            StudyMaterialDTO dto = studyMaterialService.uploadMaterial(classSessionId, uploaderId, title, file);
            return ResponseEntity.ok(dto);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Lỗi xử lý file: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/public")
    public ResponseEntity<?> uploadPublicMaterial(
            @RequestParam("uploaderId") Long uploaderId,
            @RequestParam(value = "subjectId", required = false) Long subjectId,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("file") MultipartFile file) {
        try {
            StudyMaterialDTO dto = studyMaterialService.uploadPublicMaterial(uploaderId, subjectId, title, description, file);
            return ResponseEntity.ok(dto);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Lỗi xử lý file: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMaterial(@PathVariable Long id) {
        try {
            studyMaterialService.deleteMaterial(id);
            return ResponseEntity.ok(Map.of("message", "Đã xóa tài liệu"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Lỗi khi xóa: " + e.getMessage()));
        }
    }
}
