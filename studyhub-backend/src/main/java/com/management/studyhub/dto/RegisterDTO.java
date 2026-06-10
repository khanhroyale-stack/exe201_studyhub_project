package com.management.studyhub.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String role; // "PARENT" or "TUTOR"
    private String fullName;
}
