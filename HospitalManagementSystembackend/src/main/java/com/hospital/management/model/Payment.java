package com.hospital.management.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;
    
    @Column(nullable = false)
    private double amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;
    
    @Column
    private String paymentMethod;
    
    @Column
    private LocalDateTime paymentDate;
    
    @Column
    private String transactionId;
    
    @Column
    private String invoiceNumber;
} 