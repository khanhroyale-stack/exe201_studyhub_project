package com.management.studyhub.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class AutoUpdateDB {

    @Bean
    public CommandLineRunner updateTutorsStatus(JdbcTemplate jdbcTemplate) {
        return args -> {
            jdbcTemplate.execute("UPDATE tutor_profiles SET status = 'APPROVED' WHERE status IS NULL");
            System.out.println("✅ ĐÃ TỰ ĐỘNG CẬP NHẬT TRẠNG THÁI GIA SƯ THÀNH APPROVED!");
        };
    }
}
