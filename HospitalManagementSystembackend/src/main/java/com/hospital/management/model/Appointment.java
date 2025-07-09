package com.hospital.management.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    @Column(nullable = false)
    private LocalDateTime appointmentDateTime;
    
    @Column
    private String purpose;
    
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.PENDING;
    
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
    private Payment payment;
} 