package com.springboot.app.repository;

import com.springboot.app.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSeekerRepository extends JpaRepository<JobSeeker,Integer> {
    JobSeeker findByUserUsername(String name);
}
