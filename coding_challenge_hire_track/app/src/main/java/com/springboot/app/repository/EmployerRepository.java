package com.springboot.app.repository;

import com.springboot.app.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer,Integer> {
    Employer findByUserUsername(String name);
}
