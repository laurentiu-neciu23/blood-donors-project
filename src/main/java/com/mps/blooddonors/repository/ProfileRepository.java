package com.mps.blooddonors.repository;

import com.mps.blooddonors.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository  extends JpaRepository<Profile, Long> {

}
