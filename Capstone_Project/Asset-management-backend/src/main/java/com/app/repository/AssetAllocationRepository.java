package com.app.repository;

import com.app.model.AssetAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetAllocationRepository extends JpaRepository<AssetAllocation,Integer> {
    @Query("""
    select a from AssetAllocation a where a.employee.id= ?1
        """)
    List<AssetAllocation> getAllByEmployee(int employeeId);


    @Query("""
            SELECT count(a)
            FROM AssetAllocation a
            WHERE a.returnDate IS NULL and a.employee.id=?1
           """)
    Long getAllApprovedCountByEmp(int employee);
}
