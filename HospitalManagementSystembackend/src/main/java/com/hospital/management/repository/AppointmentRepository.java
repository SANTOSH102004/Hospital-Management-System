package com.hospital.management.repository;

import com.hospital.management.model.Appointment;
import com.hospital.management.model.AppointmentStatus;
import com.hospital.management.model.Doctor;
import com.hospital.management.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByStatus(AppointmentStatus status);
    List<Appointment> findByPatientAndStatus(Patient patient, AppointmentStatus status);
    List<Appointment> findByDoctorAndStatus(Doctor doctor, AppointmentStatus status);
    List<Appointment> findByAppointmentDateTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Appointment> findByDoctorAndAppointmentDateTimeBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);
} 