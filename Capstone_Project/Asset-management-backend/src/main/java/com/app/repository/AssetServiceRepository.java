package com.app.repository;

import com.app.model.AssetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetServiceRepository extends JpaRepository<AssetService,Integer> {
    @Query("""
    select a from AssetService a where a.employee.id= ?1
        """)
    List<AssetService> getAllByEmployee(int id);

    @Query("""
            SELECT count(a)
            FROM AssetService a
            WHERE a.status = com.app.enums.Status.IN_PROGRESS
           """)
    Long getAllInProgressCount();

    @Query("""
            SELECT count(a)
            FROM AssetService a
            WHERE a.status = com.app.enums.Status.IN_PROGRESS
            and a.employee.id=?1
           """)
    Long getAllInProgressCountByEmp(int employee);
}
