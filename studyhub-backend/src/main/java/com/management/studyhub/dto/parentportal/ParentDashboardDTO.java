package com.management.studyhub.dto.parentportal;

import lombok.Data;

@Data
public class ParentDashboardDTO {
    private int activeApplications;
    private int newApplicationsToday;
    private int classesWaiting;
    private double budgetSpentThisMonth;
}
