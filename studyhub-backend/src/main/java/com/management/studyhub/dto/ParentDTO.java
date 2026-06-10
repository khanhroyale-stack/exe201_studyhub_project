package com.management.studyhub.dto;

import lombok.Data;

@Data
public class ParentDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String avatar;
    private String address;
    private Double budgetSpentThisMonth;
    private Integer classesWaiting;
}
