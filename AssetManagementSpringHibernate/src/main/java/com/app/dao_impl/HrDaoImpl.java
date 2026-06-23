package com.app.dao_impl;

import com.app.dao.HrDao;
import com.app.model.Hr;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

@Component
public class HrDaoImpl implements HrDao {
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public Hr getByUsername(String hrUsername) {
        String sql="select h from Hr h where h.user.username = ?1";
        TypedQuery<Hr> query =  entityManager.createQuery(sql, Hr.class);
        query.setParameter(1, hrUsername);

        return query.getSingleResult();
    }
}