package com.app.dao_impl;

import com.app.dao.AuthDao;
import com.app.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

@Component
public class AuthDaoImpl implements AuthDao {
    @PersistenceContext  //<-- Spring now will check if the bean for EM class exists
    private EntityManager em;

    @Override
    public User login(String username, String password) {
        TypedQuery<User> query
                =  em.createQuery("select u from User u where u.username=:username and u.password=:password", User.class);
        query.setParameter("username" , username);
        query.setParameter("password" , password);

        return query.getSingleResult();

//        Query query =  em.createQuery("select u from User u where u.username=:username and u.password=:password");
//        query.setParameter("username" , username);
//        query.setParameter("password" , password);
//
//        return (User)query.getSingleResult(); --->this works too

    }
}
