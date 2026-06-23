package com.app.repository;

import com.app.model.Admin;
import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository  extends JpaRepository<Admin,Integer> {
    Admin findByUser(User user);

    @Query("""
        Select a from Admin a where a.user.username=?1
    """)
    Admin getAdminByUserName(String adminUsername);
}
