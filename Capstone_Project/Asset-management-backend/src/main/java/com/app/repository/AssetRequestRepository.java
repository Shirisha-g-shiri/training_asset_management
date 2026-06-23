package com.app.repository;

import com.app.model.AssetRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRequestRepository extends JpaRepository<AssetRequest,Integer> {
    @Query("""
            SELECT ar
            FROM AssetRequest ar
            WHERE ar.employee.user.username = ?1
            AND ar.status = com.app.enums.Status.IN_PROGRESS
           """)
    Page<AssetRequest> getAllInProgressByEmp(String employeeUsername,Pageable pageable);


    @Query("""
            SELECT count(ar)
            FROM AssetRequest ar
            WHERE ar.status = com.app.enums.Status.IN_PROGRESS
           """)
    Long getAllInProgressCount();

    @Query("""
            SELECT ar
            FROM AssetRequest ar
            WHERE ar.employee.user.username = ?1
    """)
    Page<AssetRequest> getAllByEmpWithPagination(String username, Pageable pageable);

    @Query("""
            SELECT ar
            FROM AssetRequest ar
            WHERE ar.status = com.app.enums.Status.IN_PROGRESS
           """)
    Page<AssetRequest> getAllInProgressByAdmin(Pageable pageable);


    @Query("""
            SELECT count(ar)
            FROM AssetRequest ar
            WHERE ar.status = com.app.enums.Status.IN_PROGRESS
            and ar.employee.id=?1
           """)
    Long getAllInProgressCountByEmp(int employee);
}
