package com.mps.blooddonors.repository;

import com.mps.blooddonors.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    Hospital findByHospitalName(String hospitalName);
}
