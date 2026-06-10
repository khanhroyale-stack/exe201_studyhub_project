package com.management.studyhub.dto.adminportal;

import lombok.Data;

@Data
public class AdminDashboardDTO {
    private int totalUsers;
    private int newUsersToday;
    private int activeClasses;
    private double totalRevenue;
}
