package com.management.studyhub.controller;

import com.management.studyhub.dto.adminportal.*;
import com.management.studyhub.service.AdminPortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin-portal")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminPortalController {

    private final AdminPortalService adminPortalService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardDTO> getDashboardStats() {
        return ResponseEntity.ok(adminPortalService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserDTO>> getUsers() {
        return ResponseEntity.ok(adminPortalService.getUsers());
    }
}
