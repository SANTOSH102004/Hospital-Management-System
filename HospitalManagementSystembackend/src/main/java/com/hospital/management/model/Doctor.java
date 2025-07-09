package com.hospital.management.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @Column(nullable = false)
    private String specialization;
    
    @Column
    private String qualification;
    
    @Column
    private double consultationFee;
    
    @Column
    private String experience;
    
    @Column
    private String availability;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();
} 