package com.management.studyhub.controller;

import com.management.studyhub.entity.enums.TransactionStatus;
import com.management.studyhub.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/confirm-hire/{classId}")
    public ResponseEntity<?> confirmHire(@PathVariable Long classId) {
        try {
            String qrUrl = paymentService.generatePaymentQR(classId);
            // In a real app, you might want to return the transactionCode as well for polling
            return ResponseEntity.ok(Map.of(
                "success", true,
                "qrUrl", qrUrl
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/status/{transactionCode}")
    public ResponseEntity<?> getStatus(@PathVariable String transactionCode) {
        try {
            TransactionStatus status = paymentService.getTransactionStatus(transactionCode);
            return ResponseEntity.ok(Map.of(
                "status", status.name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody Map<String, Object> payload) {
        // Here you would normally verify the Casso/PayOS signature header
        // e.g., String signature = request.getHeader("Casso-Signature");
        
        paymentService.handleWebhook(payload);
        
        return ResponseEntity.ok(Map.of("success", true));
    }
}
