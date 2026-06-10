package com.management.studyhub.dto;

import com.management.studyhub.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
    private String token;
    private UserRole role;
    private String email;
    private String name;
    private String avatar;
    private Long tutorId;
}
