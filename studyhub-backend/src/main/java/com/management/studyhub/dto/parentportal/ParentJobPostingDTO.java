package com.management.studyhub.dto.parentportal;

import lombok.Data;
import java.util.List;

@Data
public class ParentJobPostingDTO {
    private Long id;
    private String title;
    private String subject;
    private String status;
    private String location;
    private String schedule;
    private String requirement;
    private Double pricePerSession;
    private Integer applicantsCount;
    private List<String> applicantsAvatars;
}
