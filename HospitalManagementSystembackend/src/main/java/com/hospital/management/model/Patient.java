package com.hospital.management.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @Column
    private LocalDate dateOfBirth;
    
    @Column
    private String gender;
    
    @Column
    private String bloodGroup;
    
    @Column
    private String address;
    
    @Column
    private String medicalHistory;
    
    @Column
    private String insuranceDetails;
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();
} 