package com.springboot.app.repository;

import com.springboot.app.model.Application;
import com.springboot.app.model.JobSeeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {

    @Query("""
            select a
            from Application a
            where a.jobSeeker.user.username=?1
            """)
    Page<Application> getApplicationByJobSeeker(String username, Pageable pageable);

    @Query("""
            select a
            from Application a
            where a.job.employer.user.username=?1
            """)
    Page<Application> getApplicationByEmployer(String name, Pageable pageable);
}
