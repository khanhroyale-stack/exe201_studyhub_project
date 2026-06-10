package com.management.studyhub.controller;

import com.management.studyhub.dto.ParentDTO;
import com.management.studyhub.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.management.studyhub.dto.ClassSessionDTO;

@RestController
@RequestMapping("/api/v1/parents")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParentController {
    private final ParentService parentService;

    @GetMapping("/{id}")
    public ResponseEntity<ParentDTO> getParent(@PathVariable Long id) {
        return ResponseEntity.ok(parentService.getParentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParentDTO> updateParent(@PathVariable Long id, @RequestBody ParentDTO dto) {
        return ResponseEntity.ok(parentService.updateParent(id, dto));
    }

    @GetMapping("/{id}/classes")
    public ResponseEntity<List<ClassSessionDTO>> getClassSessions(@PathVariable Long id) {
        return ResponseEntity.ok(parentService.getClassSessions(id));
    }
}
