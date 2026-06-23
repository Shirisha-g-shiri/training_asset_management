package com.app.repository;

import com.app.dto.EmployeeDto;
import com.app.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee , Integer> {
    Employee findByUserUsername(String userUsername);

    @Query("""
        SELECT new com.app.dto.EmployeeDto(e.id,e.email,e.mobileNo,e.name,e.department,COUNT(a))
                    FROM Employee e
                    LEFT JOIN AssetAllocation a ON a.employee.id = e.id
                    GROUP BY e.id
       """)
    List<EmployeeDto> getAllWithAsset();

    @Query("""
        SELECT count(e) FROM Employee e
    """)
    Long getAllEmpCount();
}
