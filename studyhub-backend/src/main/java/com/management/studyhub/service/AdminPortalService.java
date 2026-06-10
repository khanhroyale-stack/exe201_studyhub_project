package com.management.studyhub.service;

import com.management.studyhub.dto.adminportal.*;
import com.management.studyhub.entity.*;
import com.management.studyhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminPortalService {

    private final UserRepository userRepository;
    private final ClassSessionRepository classSessionRepository;
    private final CommissionRecordRepository commissionRecordRepository;
    private final TutorProfileRepository tutorProfileRepository;
    private final ParentRepository parentRepository;

    public AdminDashboardDTO getDashboardStats() {
        AdminDashboardDTO dto = new AdminDashboardDTO();
        dto.setTotalUsers((int) userRepository.count());
        dto.setNewUsersToday(5); // Mocked for now
        
        List<ClassSession> classes = classSessionRepository.findAll();
        int active = 0;
        for (ClassSession cs : classes) {
            if ("OFFICIAL".equals(cs.getStatus()) || "IN_PROGRESS".equals(cs.getStatus())) {
                active++;
            }
        }
        dto.setActiveClasses(active);

        List<CommissionRecord> commissions = commissionRecordRepository.findAll();
        double totalRev = 0;
        for (CommissionRecord cr : commissions) {
            if (cr.getAmount() != null && "PAID".equals(cr.getStatus() != null ? cr.getStatus().name() : "")) {
                totalRev += cr.getAmount().doubleValue();
            }
        }
        dto.setTotalRevenue(totalRev);
        
        return dto;
    }

    public List<AdminUserDTO> getUsers() {
        return userRepository.findAll().stream().map(u -> {
            AdminUserDTO dto = new AdminUserDTO();
            dto.setId(u.getId());
            dto.setEmail(u.getEmail());
            dto.setRole(u.getRole() != null ? u.getRole().name() : "USER");
            dto.setStatus("ACTIVE");
            dto.setJoinDate("");

            if ("TUTOR".equals(dto.getRole())) {
                TutorProfile tp = tutorProfileRepository.findAll().stream().filter(t -> t.getUser().getId().equals(u.getId())).findFirst().orElse(null);
                if (tp != null) {
                    dto.setName(tp.getFullName());
                    dto.setStatus(tp.getStatus() != null ? tp.getStatus().name() : "ACTIVE");
                }
            } else if ("PARENT".equals(dto.getRole())) {
                Parent p = parentRepository.findAll().stream().filter(pa -> pa.getUser().getId().equals(u.getId())).findFirst().orElse(null);
                if (p != null) {
                    dto.setName(p.getName());
                }
            }
            if (dto.getName() == null) dto.setName(u.getEmail());
            return dto;
        }).collect(Collectors.toList());
    }
}
