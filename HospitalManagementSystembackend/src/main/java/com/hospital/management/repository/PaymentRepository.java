package com.hospital.management.repository;

import com.hospital.management.model.Appointment;
import com.hospital.management.model.Payment;
import com.hospital.management.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByAppointment(Appointment appointment);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end);
    List<Payment> findByInvoiceNumber(String invoiceNumber);
    Optional<Payment> findByTransactionId(String transactionId);
} 