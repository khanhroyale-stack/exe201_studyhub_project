package com.management.studyhub.service;

import com.management.studyhub.entity.ClassSession;
import com.management.studyhub.entity.Transaction;
import com.management.studyhub.entity.enums.ClassSessionStatus;
import com.management.studyhub.entity.enums.TransactionStatus;
import com.management.studyhub.repository.ClassSessionRepository;
import com.management.studyhub.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final ClassSessionRepository classSessionRepository;
    private final TransactionRepository transactionRepository;
    private final com.management.studyhub.repository.CommissionRecordRepository commissionRecordRepository;
    private final com.management.studyhub.repository.TutorProfileRepository tutorProfileRepository;

    // Thay bằng số tài khoản thật của StudyHub
    private static final String BANK_BIN = "970436"; // Vietcombank
    private static final String ACCOUNT_NUMBER = "123456789";
    private static final String ACCOUNT_NAME = "STUDYHUB";

    @Transactional
    public Map<String, String> generatePaymentQR(Long classId) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        if (classSession.getStatus() != ClassSessionStatus.TRIAL && classSession.getStatus() != ClassSessionStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Lớp học không ở trạng thái Chờ học thử hoặc Chờ thanh toán");
        }

        // Tạo Transaction
        String transactionCode = "SH" + classId + System.currentTimeMillis() % 10000;
        
        Transaction transaction = new Transaction();
        transaction.setClassSession(classSession);
        transaction.setTransactionCode(transactionCode);
        transaction.setAmount(classSession.getPrice());
        transaction.setStatus(TransactionStatus.PENDING);
        transactionRepository.save(transaction);

        // Update Class status
        classSession.setStatus(ClassSessionStatus.PENDING_PAYMENT);
        classSessionRepository.save(classSession);

        // Tạo VietQR link
        long amountStr = classSession.getPrice() != null ? classSession.getPrice().longValue() : 0L;
        String qrUrl = String.format("https://img.vietqr.io/image/%s-%s-compact2.png?amount=%d&addInfo=%s&accountName=%s",
                BANK_BIN, ACCOUNT_NUMBER, amountStr, transactionCode, ACCOUNT_NAME);
        
        return Map.of(
            "qrUrl", qrUrl,
            "transactionCode", transactionCode
        );
    }

    public TransactionStatus getTransactionStatus(String transactionCode) {
        Transaction transaction = transactionRepository.findByTransactionCode(transactionCode)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return transaction.getStatus();
    }

    @Transactional
    public void handleWebhook(Map<String, Object> payload) {
        // Giả lập xử lý webhook từ Casso / PayOS
        // Thường webhook sẽ có dạng { "data": [ { "description": "CK SH12345", "amount": 2000000 } ] }
        log.info("Received Webhook: {}", payload);
        
        try {
            // Giả lập parse data cơ bản
            if (payload.containsKey("data")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> dataList = (List<Map<String, Object>>) payload.get("data");
                for (Map<String, Object> data : dataList) {
                    String description = (String) data.get("description");
                    Number amount = (Number) data.get("amount");
                    
                    if (description != null) {
                        // Tìm transaction code trong description (Mô phỏng bằng Regex)
                        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("(SH\\d{1,10})");
                        java.util.regex.Matcher matcher = pattern.matcher(description);
                        if (matcher.find()) {
                            String code = matcher.group(1);
                            transactionRepository.findByTransactionCode(code).ifPresent(t -> {
                                if (t.getStatus() == TransactionStatus.PENDING && Math.abs(t.getAmount() - amount.doubleValue()) < 1.0) {
                                    t.setStatus(TransactionStatus.SUCCESS);
                                    transactionRepository.save(t);
                                    
                                    ClassSession classSession = t.getClassSession();
                                    classSession.setStatus(ClassSessionStatus.CONFIRMED);
                                    classSessionRepository.save(classSession);
                                    
                                    // Tạo CommissionRecord (Hoa hồng 20%)
                                    com.management.studyhub.entity.CommissionRecord commission = new com.management.studyhub.entity.CommissionRecord();
                                    commission.setTransaction(t);
                                    commission.setTotalAmount(t.getAmount());
                                    double platformFee = t.getAmount() * 0.20;
                                    commission.setPlatformFee(platformFee);
                                    commission.setTutorPayout(t.getAmount() - platformFee);
                                    commissionRecordRepository.save(commission);
                                    
                                    log.info("Payment confirmed & Commission generated for transaction: {}", t.getTransactionCode());
                                }
                            });
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("Error processing webhook", e);
        }
    }

    public List<Map<String, Object>> getCompletedClasses() {
        List<ClassSession> sessions = classSessionRepository.findByStatus(ClassSessionStatus.COMPLETED);
        return sessions.stream().map(session -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", session.getId());
            map.put("className", session.getClassName());
            map.put("tutorName", session.getTutorName());
            map.put("tutorAvatar", session.getTutorAvatar());
            map.put("price", session.getPrice());
            map.put("pricePerSession", session.getPricePerSession());
            map.put("status", session.getStatus() != null ? session.getStatus().name() : "");
            
            if (session.getTutorProfileId() != null) {
                tutorProfileRepository.findById(session.getTutorProfileId()).ifPresent(tutor -> {
                    map.put("bankAccountNumber", tutor.getBankAccountNumber());
                    map.put("bankName", tutor.getBankName());
                    map.put("bankAccountName", tutor.getBankAccountName());
                });
            }
            return map;
        }).collect(java.util.stream.Collectors.toList());
    }

    @Transactional
    public void disburseClass(Long classId) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        if (classSession.getStatus() != ClassSessionStatus.COMPLETED) {
            throw new RuntimeException("Class must be COMPLETED to disburse");
        }

        classSession.setStatus(ClassSessionStatus.DISBURSED);
        classSessionRepository.save(classSession);
        log.info("Disbursed payment for class: {}", classId);
    }

    /**
     * Mô phỏng nhận webhook thành công (CHỈ DÙNG CHO TEST/ĐỒ ÁN)
     * Giả lập việc ngân hàng gửi xác nhận chuyển tiền thành công
     */
    @Transactional
    public Map<String, Object> simulatePaymentSuccess(String transactionCode) {
        Transaction transaction = transactionRepository.findByTransactionCode(transactionCode)
                .orElseThrow(() -> new RuntimeException("Transaction không tìm thấy: " + transactionCode));

        if (transaction.getStatus() == TransactionStatus.SUCCESS) {
            return Map.of("success", false, "message", "Giao dịch này đã được xử lý thành công trước đó.");
        }

        transaction.setStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction);

        ClassSession classSession = transaction.getClassSession();
        classSession.setStatus(ClassSessionStatus.CONFIRMED);
        classSessionRepository.save(classSession);

        // Tạo CommissionRecord (Hoa hồng 20%)
        com.management.studyhub.entity.CommissionRecord commission = new com.management.studyhub.entity.CommissionRecord();
        commission.setTransaction(transaction);
        commission.setTotalAmount(transaction.getAmount());
        double platformFee = transaction.getAmount() * 0.20;
        commission.setPlatformFee(platformFee);
        commission.setTutorPayout(transaction.getAmount() - platformFee);
        commissionRecordRepository.save(commission);

        log.info("[SIMULATE] Payment SUCCESS for transaction: {}, class: {}", transactionCode, classSession.getId());

        return Map.of(
            "success", true,
            "message", "Mô phỏng thanh toán thành công",
            "transactionCode", transactionCode,
            "classId", classSession.getId(),
            "newClassStatus", "CONFIRMED"
        );
    }
}
