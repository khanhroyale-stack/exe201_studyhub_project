package com.management.studyhub.dto.tutorportal;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CommissionRecordDTO {
    private Long id;
    private String month;
    private String status;
    private String className;
    private Integer totalSessions;
    private BigDecimal totalRevenue;
    private BigDecimal platformFeeAmount;
    private Integer platformFeePercent;
    private LocalDateTime dueDate;
    private String qrCodeUrl;
}
