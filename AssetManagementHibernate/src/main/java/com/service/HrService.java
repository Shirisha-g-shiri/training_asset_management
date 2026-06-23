package com.service;

import com.model.Hr;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class HrService {
    private final Session session;

    public HrService(Session session) {
        this.session = session;
    }

    public Hr getByUsername(String username) {
        Transaction transaction = session.beginTransaction();
        Hr hr = session.createQuery("select c from Hr c where c.user.username=:username",Hr.class)
                .setParameter("username",username)
                .getSingleResult();
        transaction.commit();
        return hr;
    }
}
