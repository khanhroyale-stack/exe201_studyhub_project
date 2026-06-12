package com.management.studyhub.dto;

import lombok.Data;

@Data
public class PublicMaterialFilterDTO {
    private Long subjectId;
    private String keyword;
    private String fileType;
    private int page = 0;
    private int size = 12;
}
