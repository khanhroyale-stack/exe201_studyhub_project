package com.studyhub.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * REST Controller kiểm tra trạng thái hoạt động của hệ thống.
 */
@RestController
@RequestMapping("/api/v1/health")
public class HealthCheckController {

    /**
     * GET /api/v1/health
     * Kiểm tra kết nối và trạng thái API.
     */
    @GetMapping
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "message", "StudyHub API connected successfully"
        ));
    }
}
